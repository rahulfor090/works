import React, { useState } from 'react';
import Head from 'next/head';
import { Play } from 'lucide-react';
import SiteNavbar from '@/components/layout/SiteNavbar';
import SiteFooter from '@/components/layout/SiteFooter';

interface Video {
    id: string;
    title: string;
}

const VIDEOS: Video[] = [
    {
        id: 'dFv3jPml4zg',
        title: 'Sure Success Magic | B RAMGOPAL',
    },
    {
        id: 'JVGL4CQtlX0',
        title: 'Textbook for Ophthalmic Assistants',
    },
    {
        id: 'cX5OIyNNngw',
        title: "DC Dutta's Textbook of Gynecology",
    },
];

const VideoCard = ({ video }: { video: Video }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [title, setTitle] = useState(video.title);

    React.useEffect(() => {
        const fetchTitle = async () => {
            try {
                const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.id}&format=json`);
                const data = await response.json();
                if (data.title) {
                    setTitle(data.title);
                }
            } catch (error) {
                console.error('Error fetching video title:', error);
            }
        };

        fetchTitle();
    }, [video.id]);

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full group">
            <div className="relative aspect-video bg-slate-100">
                {isPlaying ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    />
                ) : (
                    <button
                        onClick={() => setIsPlaying(true)}
                        className="absolute inset-0 w-full h-full group/thumbnail cursor-pointer"
                        aria-label={`Play ${title}`}
                    >
                        <img
                            src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/thumbnail:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover/thumbnail:bg-black/30 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover/thumbnail:scale-110 transition-all duration-300 backdrop-blur-sm">
                                <Play className="w-6 h-6 text-[#0A2540] ml-1" fill="currentColor" />
                            </div>
                        </div>
                    </button>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold text-[#0A2540] line-clamp-2 leading-tight group-hover:text-[#3B82F6] transition-colors">
                    {title}
                </h3>
            </div>
        </div>
    );
};

const VideosPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Head>
                <title>Videos | CourseSpace</title>
                <meta name="description" content="Watch our latest videos and tutorials" />
            </Head>

            <SiteNavbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="pt-32 pb-12 bg-gradient-to-br from-[#F0F9FF] via-white to-[#FFF5F5] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3B82F6] via-[#FF6B6B] to-[#10B981]"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl lg:text-5xl font-bold text-[#0A2540] mb-6 font-serif">
                                Featured Videos
                            </h1>
                            <p className="text-lg text-[#64748B] leading-relaxed">
                                Explore our collection of educational content, tutorials, and insights.
                                Click to play directly or watch on YouTube.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Videos Grid */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {VIDEOS.map((video) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
};

export default VideosPage;
