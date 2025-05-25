
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Twitter, Heart, MessageCircle, Repeat2, TrendingUp } from 'lucide-react';

interface Tweet {
  id: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  retweets: number;
  replies: number;
  time: string;
  theme: string;
}

interface TrendingTweetsProps {
  selectedTheme?: string;
}

const TrendingTweets: React.FC<TrendingTweetsProps> = ({ selectedTheme }) => {
  const getThemeSpecificTweets = (theme: string): Tweet[] => {
    const tweetTemplates = {
      'AI Agents': [
        { content: `The ${theme} revolution is accelerating! 🤖 New autonomous systems are reshaping how we work and interact with technology. The potential applications seem endless! #AIAgents #Automation`, likes: 5200, retweets: 987, replies: 231 },
        { content: `Major breakthrough in ${theme}! 🚀 These intelligent systems are becoming more sophisticated daily. Everyone's discussing the implications for productivity and creativity. #AI #TechTrends`, likes: 3100, retweets: 654, replies: 189 },
        { content: `${theme} trending analysis: Social engagement up 340%, sentiment overwhelmingly positive about autonomous AI capabilities! 📈 #AIAgents #Innovation`, likes: 1800, retweets: 432, replies: 156 }
      ],
      'Election Drama': [
        { content: `The ${theme} continues to dominate social feeds! 🗳️ Campaign strategies and debate highlights are generating massive engagement across platforms. #Election2024 #Politics`, likes: 8200, retweets: 1587, replies: 431 },
        { content: `Breaking: Latest ${theme} developments! 📊 Polling data and campaign updates are driving unprecedented social media activity. The political discourse is intense! #ElectionNews`, likes: 6100, retweets: 954, replies: 289 },
        { content: `${theme} social metrics: Engagement up 280%, political discussions at all-time high. The democratic process is capturing everyone's attention! 🇺🇸 #Democracy`, likes: 2800, retweets: 532, replies: 198 }
      ],
      'default': [
        { content: `The ${selectedTheme || 'trending topic'} conversation is exploding! 🔥 Seeing incredible engagement and community growth. This topic is really resonating with people right now. #Trending #Social`, likes: 5200, retweets: 987, replies: 231 },
        { content: `Major developments in ${selectedTheme || 'current trends'}! 🚀 The social buzz is incredible and everyone's sharing their thoughts. This is definitely the topic of the moment. #Viral #Trending`, likes: 3100, retweets: 654, replies: 189 },
        { content: `${selectedTheme || 'Hot topic'} trending analysis: Social mentions up 340%, positive sentiment dominating. The community engagement is absolutely phenomenal! 📈 #TrendingNow`, likes: 1800, retweets: 432, replies: 156 }
      ]
    };

    const templates = tweetTemplates[theme as keyof typeof tweetTemplates] || tweetTemplates.default;
    
    return templates.map((template, index) => ({
      id: String(index + 1),
      author: ['Sarah Chen', 'Marcus Data', 'Tech Insider'][index],
      handle: ['@sarahchen_tech', '@marcusdata', '@techinsider_x'][index],
      content: template.content,
      likes: template.likes,
      retweets: template.retweets,
      replies: template.replies,
      time: ['25min', '3min', '1h'][index],
      theme: selectedTheme || 'Trending'
    }));
  };

  const tweets = getThemeSpecificTweets(selectedTheme || 'default');

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Card className="bg-gradient-to-br from-crypto-purple/20 to-crypto-blue/20 border-crypto-purple/30 backdrop-blur-sm bg-slate-900">
      <CardHeader className="bg-slate-900">
        <CardTitle className="text-white flex items-center gap-2">
          <Twitter className="h-6 w-6" />
          {selectedTheme || 'Trending'} Tweets
        </CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <span className="px-2 py-1 bg-crypto-neon-purple/20 rounded-full text-crypto-cyan">
            AI powered
          </span>
          <span className="px-2 py-1 bg-crypto-neon-blue/20 rounded-full text-crypto-cyan">
            Real-time data
          </span>
          <span className="px-2 py-1 bg-green-500/20 rounded-full text-green-400">
            Live sentiment
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <span className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            72h trending data
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 bg-slate-900">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="p-4 bg-black/20 rounded-lg border border-crypto-purple/20 hover:border-crypto-purple/40 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-crypto-neon-purple to-crypto-neon-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{tweet.author.split(' ').map(n => n[0]).join('')}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-medium">{tweet.author}</span>
                  <span className="text-gray-400 text-sm">{tweet.handle}</span>
                  <span className="text-gray-500 text-sm">·</span>
                  <span className="text-gray-400 text-sm">{tweet.time}</span>
                </div>
                
                <p className="text-gray-300 mb-3 leading-relaxed">{tweet.content}</p>
                
                <div className="flex items-center gap-6 text-gray-400">
                  <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{formatNumber(tweet.replies)}</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-green-400 cursor-pointer">
                    <Repeat2 className="h-4 w-4" />
                    <span className="text-sm">{formatNumber(tweet.retweets)}</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-red-400 cursor-pointer">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{formatNumber(tweet.likes)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrendingTweets;
