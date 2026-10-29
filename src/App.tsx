/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Home } from './components/Home';
import { ServiceDetail } from './components/ServiceDetail';
import { BlogList } from './components/BlogList';
import { BlogPostView } from './components/BlogPostView';
import { Noticias } from './components/Noticias';
import { MatrixRain } from './components/MatrixRain';
import { AudioPlayer } from './components/AudioPlayer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CurriculumTelemetryModal } from './components/CurriculumTelemetryModal';
import { services } from './data';
import { blogPosts } from './blogData';
import { techNews } from './newsData';
import { ServiceId, BlogPost, TechNewsItem } from './types';
import { sfx } from './utils/soundEffects';

type ViewMode = 'HOME' | 'BLOG' | 'BLOG_POST' | 'NOTICIAS' | ServiceId;

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('HOME');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(blogPosts[0] || null);

  // Sincronización de rutas con deep-linking hash (#noticias, #blog, #servicio-...) y soporte nativo para botón ATRÁS
  useEffect(() => {
    const handleHashRouting = () => {
      const hash = window.location.hash;
      
      // Si el hash está vacío o es raíz, volver a HOME
      if (!hash || hash === '#' || hash === '#/' || hash === '#home') {
        setCurrentView('HOME');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash.startsWith('#noticias')) {
        setCurrentView('NOTICIAS');
      } else if (hash.startsWith('#blog')) {
        const match = hash.match(/id=([a-zA-Z0-9-_]+)/);
        if (match && match[1]) {
          const found = blogPosts.find(p => p.id === match[1] || p.slug === match[1]);
          if (found) {
            setSelectedPost(found);
            setCurrentView('BLOG_POST');
            return;
          }
        }
        setCurrentView('BLOG');
      } else if (hash.startsWith('#servicio-')) {
        const sId = hash.replace('#servicio-', '');
        if (services[sId as ServiceId]) {
          setCurrentView(sId as ServiceId);
          return;
        }
        setCurrentView('HOME');
      } else {
        setCurrentView('HOME');
      }
    };

    handleHashRouting();
    window.addEventListener('hashchange', handleHashRouting);
    window.addEventListener('popstate', handleHashRouting);
    return () => {
      window.removeEventListener('hashchange', handleHashRouting);
      window.removeEventListener('popstate', handleHashRouting);
    };
  }, []);

  const handleSelectService = (id: ServiceId) => {
    sfx.playWarp();
    window.location.hash = `servicio-${id}`;
    setCurrentView(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenBlog = () => {
    sfx.playWarp();
    window.location.hash = 'blog';
    setCurrentView('BLOG');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenNoticias = () => {
    sfx.playWarp();
    window.location.hash = 'noticias';
    setCurrentView('NOTICIAS');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectPost = (post: BlogPost) => {
    sfx.playSelect();
    setSelectedPost(post);
    window.location.hash = `blog?id=${post.id}`;
    setCurrentView('BLOG_POST');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectNewsItem = (item: TechNewsItem) => {
    sfx.playSelect();
    window.location.hash = `noticias?id=${item.id}`;
    setCurrentView('NOTICIAS');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    sfx.playBack();
    setCurrentView('HOME');
    if (window.location.hash) {
      try {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      } catch {
        window.location.hash = '';
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    sfx.playBack();
    setCurrentView('BLOG');
    try {
      window.location.hash = 'blog';
    } catch {
      // fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#060608] overflow-x-hidden relative">
      <MatrixRain />
      <AudioPlayer videoId="Dy080SqIEMU" />
      <div className="relative z-10 w-full min-h-screen overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'HOME' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <Home 
                onSelectService={handleSelectService}
                onOpenBlog={handleOpenBlog}
                onOpenNoticias={handleOpenNoticias}
                onSelectBlogPost={handleSelectPost}
                onSelectNewsItem={handleSelectNewsItem}
              />
            </motion.div>
          )}

          {currentView === 'NOTICIAS' && (
            <motion.div
              key="noticias"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              <Noticias onBackToHome={handleBackToHome} />
            </motion.div>
          )}

          {currentView === 'BLOG' && (
            <motion.div
              key="blog-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              <BlogList 
                posts={blogPosts}
                onSelectPost={handleSelectPost}
                onBackToHome={handleBackToHome}
              />
            </motion.div>
          )}

          {currentView === 'BLOG_POST' && selectedPost && (
            <motion.div
              key={`blog-post-${selectedPost.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              <BlogPostView 
                post={selectedPost}
                onBack={handleBackToBlog}
                onSelectTag={() => {
                  setCurrentView('BLOG');
                }}
              />
            </motion.div>
          )}

          {currentView !== 'HOME' && currentView !== 'BLOG' && currentView !== 'BLOG_POST' && currentView !== 'NOTICIAS' && (
            <motion.div
              key={currentView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <ServiceDetail 
                service={services[currentView as ServiceId] || Object.values(services)[0]} 
                onBack={handleBackToHome} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Disparador 3D Flotante de Telemetría Profesional & Hoja de Vida */}
      <CurriculumTelemetryModal />

      {/* Botón de Conversión Omnipresente WhatsApp B2B */}
      <FloatingWhatsApp />
    </div>
  );
}
