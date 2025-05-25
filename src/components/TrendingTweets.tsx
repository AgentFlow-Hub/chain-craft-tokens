
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
  const tweets: Tweet[] = [
    {
      id: '1',
      author: 'Crypto Katie',
      handle: '@cryptokatie',
      content: `The ${selectedTheme || 'AI Agents'} narrative is heating up! 🔥 Seeing massive community growth and dev activity. This space is evolving rapidly - stay informed and DYOR before making any moves! #${selectedTheme?.replace(/\s+/g, '') || 'AIAgents'} #Crypto`,
      likes: 5200,
      retweets: 987,
      replies: 231,
      time: '25min',
      theme: selectedTheme || 'AI Agents'
    },
    {
      id: '2',
      author: 'DeFi Queen',
      handle: '@defiqueen',
      content: `Major breakthrough in ${selectedTheme || 'AI Agents'} technology! The latest developments show incredible potential for mainstream adoption. Community sentiment is overwhelmingly bullish 📈 #Innovation #Web3`,
      likes: 3100,
      retweets: 654,
      replies: 189,
      time: '3min',
      theme: selectedTheme || 'AI Agents'
    },
    {
      id: '3',
      author: 'Tech Analyst',
      handle: '@techanalyst_crypto',
      content: `${selectedTheme || 'AI Agents'} trending analysis: 3-day social volume up 340%, sentiment positive, key influencers discussing potential. This could be the start of something big 🚀 Always manage risk! #DataDriven`,
      likes: 1800,
      retweets: 432,
      replies: 156,
      time: '1h',
      theme: selectedTheme || 'AI Agents'
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Card className="bg-gradient-to-br from-crypto-purple/20 to-crypto-blue/20 border-crypto-purple/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Twitter className="h-6 w-6" />
          {selectedTheme ? `${selectedTheme.toUpperCase()}` : 'AI AGENTS'} Trending Tweets
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
      <CardContent className="space-y-4">
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
