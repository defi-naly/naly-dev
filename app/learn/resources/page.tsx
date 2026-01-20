'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Video, FileText, ExternalLink, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  resources,
  Resource,
  ResourceType,
  ResourceTopic,
  RESOURCE_TYPES,
  RESOURCE_TOPICS,
} from '@/data/resources';

const TYPE_ICONS: Record<ResourceType, React.ReactNode> = {
  book: <Book className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
  article: <FileText className="w-4 h-4" />,
};

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-amber-500/50 transition-colors group"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-neutral-500">{TYPE_ICONS[resource.type]}</span>
            {resource.featured && (
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            )}
            {resource.duration && (
              <span className="text-neutral-600 font-mono text-xs">
                {resource.duration}
              </span>
            )}
          </div>
          <h3 className="text-white font-mono text-sm font-medium group-hover:text-amber-500 transition-colors truncate">
            {resource.title}
          </h3>
          <p className="text-neutral-500 font-mono text-xs mt-1">
            {resource.author} {resource.year && `· ${resource.year}`}
          </p>
          <p className="text-neutral-400 font-mono text-xs mt-2 line-clamp-2">
            {resource.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-3">
            {resource.topic.map(t => (
              <span
                key={t}
                className="px-2 py-0.5 bg-neutral-800 text-neutral-500 font-mono text-[10px] uppercase rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-amber-500 transition-colors flex-shrink-0" />
      </div>
    </motion.a>
  );
}

export default function ResourcesPage() {
  const [typeFilter, setTypeFilter] = useState<ResourceType | 'all'>('all');
  const [topicFilter, setTopicFilter] = useState<ResourceTopic | 'all'>('all');

  const filteredResources = resources.filter(r => {
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    if (topicFilter !== 'all' && !r.topic.includes(topicFilter)) return false;
    return true;
  });

  const featuredResources = filteredResources.filter(r => r.featured);
  const otherResources = filteredResources.filter(r => !r.featured);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-mono font-medium text-white">
              Resources
            </h1>
            <p className="text-neutral-400 font-mono text-sm mt-2">
              Books, videos, and articles to go deeper on money, cycles, and macro.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-neutral-800"
          >
            {/* Type Filter */}
            <div>
              <p className="text-neutral-600 font-mono text-xs uppercase mb-2">Type</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTypeFilter('all')}
                  className={`px-3 py-1.5 font-mono text-xs rounded transition-colors ${
                    typeFilter === 'all'
                      ? 'bg-amber-500 text-zinc-900'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                {RESOURCE_TYPES.map(type => (
                  <button
                    key={type.key}
                    onClick={() => setTypeFilter(type.key)}
                    className={`px-3 py-1.5 font-mono text-xs rounded transition-colors flex items-center gap-1.5 ${
                      typeFilter === type.key
                        ? 'bg-amber-500 text-zinc-900'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {TYPE_ICONS[type.key]}
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Filter */}
            <div>
              <p className="text-neutral-600 font-mono text-xs uppercase mb-2">Topic</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTopicFilter('all')}
                  className={`px-3 py-1.5 font-mono text-xs rounded transition-colors ${
                    topicFilter === 'all'
                      ? 'bg-amber-500 text-zinc-900'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                {RESOURCE_TOPICS.map(topic => (
                  <button
                    key={topic.key}
                    onClick={() => setTopicFilter(topic.key)}
                    className={`px-3 py-1.5 font-mono text-xs rounded transition-colors ${
                      topicFilter === topic.key
                        ? 'bg-amber-500 text-zinc-900'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Featured Section */}
          {featuredResources.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-neutral-500 font-mono text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                Essential Reading
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <ResourceCard resource={resource} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* All Resources */}
          {otherResources.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-neutral-500 font-mono text-xs uppercase tracking-wider mb-4">
                More Resources
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <ResourceCard resource={resource} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-neutral-500 font-mono text-sm">
                No resources match your filters.
              </p>
              <button
                onClick={() => {
                  setTypeFilter('all');
                  setTopicFilter('all');
                }}
                className="mt-4 text-amber-500 font-mono text-sm hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}

          {/* Back to Game Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-neutral-800 text-center"
          >
            <p className="text-neutral-600 font-mono text-xs mb-3">
              Haven't played The Money Game yet?
            </p>
            <a
              href="/learn/game"
              className="inline-flex items-center gap-2 text-amber-500 font-mono text-sm hover:underline"
            >
              Start the game →
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
