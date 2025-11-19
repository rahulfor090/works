import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@/interfaces/layout'
import { MainLayout } from '@/components/layout'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Snackbar,
  Alert,
  Chip,
  IconButton,
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'

type Preferences = {
  newContent: boolean
  events: boolean
  frequency: 'Immediate' | 'Daily' | 'Weekly'
}

type AlertItem = {
  type: 'Keyword' | 'Author'
  term: string
}

const defaultPreferences: Preferences = {
  newContent: true,
  events: false,
  frequency: 'Weekly',
}

const AlertsPage: NextPageWithLayout = () => {
  const router = useRouter()
  const [user, setUser] = React.useState<{ email: string; isPremium: boolean; id?: number } | null>(null)
  const [authChecked, setAuthChecked] = React.useState(false)
  const [preferences, setPreferences] = React.useState<Preferences>(defaultPreferences)
  const [snackOpen, setSnackOpen] = React.useState(false)
  const [alerts, setAlerts] = React.useState<AlertItem[]>([])
  const [newAlertType, setNewAlertType] = React.useState<AlertItem['type']>('Keyword')
  const [newAlertTerm, setNewAlertTerm] = React.useState('')
  const [subjectcategories, setSubjectcategories] = React.useState<Array<{ id: number; name: string }>>([])
  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<number[]>([])
  const [alertName, setAlertName] = React.useState('')

  React.useEffect(() => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    if (!userStr) {
      router.replace('/login')
      return
    }
    try {
      const parsed = JSON.parse(userStr)
      setUser(parsed)
      const stored = localStorage.getItem(`alerts:user:${parsed.email}`)
      if (stored) setPreferences(JSON.parse(stored))
      const storedAlerts = localStorage.getItem(`alerts:user:${parsed.email}:items`)
      if (storedAlerts) setAlerts(JSON.parse(storedAlerts))
      const storedCats = localStorage.getItem(`alerts:user:${parsed.email}:categories`)
      if (storedCats) setSelectedCategoryIds(JSON.parse(storedCats))
      const storedName = localStorage.getItem(`alerts:user:${parsed.email}:name`)
      if (storedName) setAlertName(storedName)
    } catch {}
    ;(async () => {
      try {
        const res = await fetch('/api/subjectcategories')
        if (res.ok) {
          const data = await res.json()
          setSubjectcategories((data || []).map((sc: any) => ({ id: sc.id, name: sc.name })))
        }
      } catch {}
    })()
    setAuthChecked(true)
  }, [])

  const savePreferences = async () => {
    if (!user?.email) {
      router.replace('/login')
      return
    }
    const key = `alerts:user:${user.email}`
    localStorage.setItem(key, JSON.stringify(preferences))
    localStorage.setItem(`${key}:items`, JSON.stringify(alerts))
    localStorage.setItem(`${key}:categories`, JSON.stringify(selectedCategoryIds))
    localStorage.setItem(`${key}:name`, alertName)
    try {
      await fetch('/api/alerts/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          frequency: preferences.frequency,
          categories: selectedCategoryIds,
          keywordAlerts: alerts.filter(a => a.type === 'Keyword').map(a => a.term),
          authorAlerts: alerts.filter(a => a.type === 'Author').map(a => a.term),
        }),
      })
      if (user?.email) {
        const payload = {
          email: user.email,
          userid: (user as any).id ?? null,
          alertname: alertName || 'My Alert',
          alerttype: preferences.frequency,
          value: JSON.stringify({
            frequency: preferences.frequency,
            categories: selectedCategoryIds,
            keywordAlerts: alerts.filter(a => a.type === 'Keyword').map(a => a.term),
            authorAlerts: alerts.filter(a => a.type === 'Author').map(a => a.term),
          }),
        }
        await fetch('/api/alerts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
    } catch {}
    setSnackOpen(true)
  }

  const addAlert = () => {
    const term = newAlertTerm.trim()
    if (!term) return
    const exists = alerts.some(a => a.type === newAlertType && a.term.trim().toLowerCase() === term.toLowerCase())
    if (exists) return
    setAlerts([...alerts, { type: newAlertType, term }])
    setNewAlertTerm('')
  }

  const removeAlert = (index: number) => {
    setAlerts(alerts.filter((_, i) => i !== index))
  }

  const Header = (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 40 }, fontWeight: 700 }}>My Alerts</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        Manage email alerts and preferences
      </Typography>
    </Box>
  )

  return (
    <>
      <Head>
        <title>Alerts</title>
      </Head>
      <Box sx={{ pt: { xs: 6, md: 8 }, pb: 8, backgroundColor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="md">
          {Header}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Alert Name"
                    value={alertName}
                    onChange={(e) => setAlertName(e.target.value)}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">Alert Summary</Typography>
                  <Typography variant="body2" color="text.secondary">Signed in as {user?.email}</Typography>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>My Alert Preferences</Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={preferences.newContent}
                          onChange={(e) => setPreferences({ ...preferences, newContent: e.target.checked })}
                        />
                      }
                      label="New content releases"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={preferences.events}
                          onChange={(e) => setPreferences({ ...preferences, events: e.target.checked })}
                        />
                      }
                      label="Events and webinars"
                    />
                  </FormGroup>

                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="alert-frequency-label">Frequency</InputLabel>
                    <Select
                      labelId="alert-frequency-label"
                      value={preferences.frequency}
                      label="Frequency"
                      onChange={(e) => setPreferences({ ...preferences, frequency: e.target.value as Preferences['frequency'] })}
                    >
                      <MenuItem value="Immediate">Immediate</MenuItem>
                      <MenuItem value="Daily">Daily</MenuItem>
                      <MenuItem value="Weekly">Weekly</MenuItem>
                    </Select>
                  </FormControl>

                  
                </Box>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>Keyword/Author Alerts</Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel id="alert-type-label">Type</InputLabel>
                        <Select
                          labelId="alert-type-label"
                          value={newAlertType}
                          label="Type"
                          onChange={(e) => setNewAlertType(e.target.value as AlertItem['type'])}
                        >
                          <MenuItem value="Keyword">Keyword</MenuItem>
                          <MenuItem value="Author">Author</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Term"
                        value={newAlertTerm}
                        onChange={(e) => setNewAlertTerm(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button fullWidth variant="contained" onClick={addAlert} disabled={!user}>Add</Button>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {alerts.map((item, idx) => (
                      <Chip
                        key={`${item.type}-${item.term}-${idx}`}
                        label={`${item.type}: ${item.term}`}
                        onDelete={() => removeAlert(idx)}
                        deleteIcon={<IconButton size="small"><DeleteIcon fontSize="small" /></IconButton> as any}
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>Category Alerts</Typography>
                  <FormControl fullWidth>
                    <InputLabel id="category-alerts-label">Subject Categories</InputLabel>
                    <Select
                      labelId="category-alerts-label"
                      multiple
                      value={selectedCategoryIds}
                      label="Subject Categories"
                      onChange={(e) => {
                        const value = e.target.value as number[] | string[]
                        setSelectedCategoryIds((Array.isArray(value) ? value : [value]).map(v => Number(v)))
                      }}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {(selected as number[]).map((id) => {
                            const sc = subjectcategories.find(s => s.id === id)
                            return <Chip key={id} label={sc ? sc.name : String(id)} sx={{ mr: 0.5 }} />
                          })}
                        </Box>
                      )}
                    >
                      {subjectcategories.map((sc) => (
                        <MenuItem key={sc.id} value={sc.id}>{sc.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
                  <Button variant="contained" onClick={savePreferences} disabled={!user}>Subscribe Alerts</Button>
                  <Button variant="outlined" onClick={() => setPreferences(defaultPreferences)}>Reset</Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
          Alert preferences saved
        </Alert>
      </Snackbar>
    </>
  )
}

AlertsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default AlertsPage
