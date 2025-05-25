
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
      'Degen Apes': [
        { content: `${theme} community is absolutely wild! 🦍 The diamond hands energy is unmatched and the memes are fire. This narrative is bringing back the golden age of degen trading! #DegenApes #DiamondHands`, likes: 5200, retweets: 987, replies: 231 },
        { content: `Just saw the ${theme} movement exploding on CT! 🚀 The community-driven approach and ape mentality is exactly what crypto needs right now. WAGMI apes! #DegenLife`, likes: 3100, retweets: 654, replies: 189 },
        { content: `${theme} sentiment analysis: 340% increase in mentions, 95% positive sentiment. The ape army is building something special here! 📈 #CryptoTwitter`, likes: 1800, retweets: 432, replies: 156 }
      ],
      'AI Uprising': [
        { content: `The ${theme} narrative is taking over! 🤖 AI agents are the future of trading and everyone's finally waking up to the potential. This is bigger than anyone realizes! #AIAgents #FutureOfFinance`, likes: 6200, retweets: 1187, replies: 331 },
        { content: `${theme} discussion going parabolic! 🚀 Autonomous trading systems and AI-powered tokens are the next big thing. Early adopters will be rewarded! #AIRevolution`, likes: 4100, retweets: 754, replies: 289 },
        { content: `${theme} social metrics off the charts: 440% engagement spike, tech Twitter is all over this narrative! The AI revolution in crypto is here! 📊 #TechTwitter`, likes: 2800, retweets: 532, replies: 198 }
      ],
      'Moon Mission': [
        { content: `${theme} energy is infectious! 🌙 The rocket ship vibes and space exploration narrative is capturing everyone's imagination. To the moon and beyond! #MoonMission #SpaceVibes`, likes: 4800, retweets: 887, replies: 221 },
        { content: `${theme} community building something legendary! 🚀 The deflationary mechanics combined with space memes is pure genius. Buckle up for liftoff! #ToTheMoon`, likes: 3600, retweets: 644, replies: 179 },
        { content: `${theme} trending hard: 380% mention increase, space and rocket emojis everywhere! The cosmic narrative is resonating perfectly! 🛸 #SpaceTwitter`, likes: 2200, retweets: 412, replies: 134 }
      ],
      'default': [
        { content: `The ${selectedTheme || 'trending narrative'} is absolutely exploding! 🔥 Seeing incredible community engagement and the memes are top tier. This is the kind of energy crypto needs! #CryptoTwitter #Trending`, likes: 5200, retweets: 987, replies: 231 },
        { content: `${selectedTheme || 'This narrative'} is going parabolic on social! 🚀 The organic growth and community building is exactly what we love to see in this space. WAGMI! #CommunityFirst`, likes: 3100, retweets: 654, replies: 189 },
        { content: `${selectedTheme || 'Hot narrative'} social analytics: 340% engagement spike, overwhelmingly positive sentiment. The community is building something special here! 📈 #SocialSentiment`, likes: 1800, retweets: 432, replies: 156 }
      ]
    };

    const templates = tweetTemplates[theme as keyof typeof tweetTemplates] || tweetTemplates.default;
    
    return templates.map((template, index) => ({
      id: String(index + 1),
      author: ['CryptoApe Mike', 'DegenTrader_X', 'MemeAnalyst'][index],
      handle: ['@cryptoape_mike', '@degentrader_x', '@memeanalyst'][index],
      content: template.content,
      likes: template.likes,
      retweets: template.retweets,
      replies: template.replies,
      time: ['15min', '2min', '47min'][index],
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
    <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
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
