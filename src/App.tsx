/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Home } from './components/Home';
import { ServiceDetail } from './components/ServiceDetail';
import { BlogList } from './components/BlogList';
import { BlogPostView } from './components/BlogPostView';
import { MatrixRain } from './components/MatrixRain';
import { AudioPlayer } from './components/AudioPlayer';
import { services } from './data';
import { blogPosts } from './blogData';
import { ServiceId, BlogPost } from './types';
import { sfx } from './utils/soundEffects';

type ViewMode = 'HOME' | 'BLOG' | 'BLOG_POST' | ServiceId;

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('HOME');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(blogPosts[0] || null);

  const handleSelectService = (id: ServiceId) => {
    sfx.playWarp();
    setCurrentView(id);
  };

  const handleOpenBlog = () => {
    sfx.playWarp();
    setCurrentView('BLOG');
  };

  const handleSelectPost = (post: BlogPost) => {
    sfx.playSelect();
    setSelectedPost(post);
    setCurrentView('BLOG_POST');
  };

  const handleBackToHome = () => {
    sfx.playBack();
    setCurrentView('HOME');
  };

  const handleBackToBlog = () => {
    sfx.playBack();
    setCurrentView('BLOG');
  };

  return (
    <div className="w-full min-h-screen bg-[#060608] overflow-hidden relative">
      <MatrixRain />
      <AudioPlayer videoId="Dy080SqIEMU" />
      <div className="relative z-10 w-full min-h-screen overflow-y-auto">
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
                onSelectBlogPost={handleSelectPost}
              />
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

          {currentView !== 'HOME' && currentView !== 'BLOG' && currentView !== 'BLOG_POST' && (
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
    </div>
  );
}



