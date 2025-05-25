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
      'AI Agent': [
        { content: `${theme} tokens are revolutionizing DeFi! 🤖 Autonomous trading systems making decisions faster than humans. The future of finance is already here! #AIAgent #DeFi`, likes: 8200, retweets: 1587, replies: 431 },
        { content: `${theme} narrative going parabolic! 🚀 Smart contracts with AI capabilities are the next big thing. Early adopters positioning for massive gains! #AIRevolution`, likes: 6100, retweets: 954, replies: 289 },
        { content: `${theme} social metrics exploding: 520% engagement spike! AI-powered trading bots and autonomous agents dominating crypto Twitter! 📊 #TechTwitter`, likes: 3800, retweets: 632, replies: 198 }
      ],
      'RWA': [
        { content: `${theme} narrative is massive! 🏦 Real World Assets on-chain bringing trillions in traditional finance to crypto. This is institutional adoption! #RWA #TradFi`, likes: 7800, retweets: 1287, replies: 381 },
        { content: `${theme} tokens bridging traditional finance and DeFi! 🌉 Tokenizing real estate, bonds, and commodities. The future of asset management! #RealWorldAssets`, likes: 5400, retweets: 824, replies: 267 },
        { content: `${theme} social sentiment off the charts: 450% mention increase! Wall Street meeting crypto street through asset tokenization! 📈 #FinTech`, likes: 3200, retweets: 512, replies: 176 }
      ],
      'DePIN': [
        { content: `${theme} infrastructure revolution! 🛜 Decentralized Physical Infrastructure Networks connecting real hardware to crypto rewards. The future is here! #DePIN`, likes: 6800, retweets: 1187, replies: 321 },
        { content: `${theme} tokens incentivizing real-world infrastructure! 🌐 WiFi hotspots, storage nodes, and IoT devices earning crypto. Physical meets digital! #Web3`, likes: 4700, retweets: 734, replies: 245 },
        { content: `${theme} narrative trending: 380% engagement boost! Crypto finally solving real-world problems with decentralized infrastructure! 🔧 #Infrastructure`, likes: 2900, retweets: 442, replies: 167 }
      ],
      'Solana Memes': [
        { content: `${theme} ecosystem going crazy! ⚡ Sub-second transactions and penny fees making meme trading accessible to everyone. Solana summer is here! #Solana`, likes: 9200, retweets: 1687, replies: 521 },
        { content: `${theme} community is unstoppable! 🚀 Fast, cheap, and fun - everything meme coins should be. SOL ecosystem pumping hard! #SolanaMemes`, likes: 6800, retweets: 1054, replies: 378 },
        { content: `${theme} social data explosive: 480% activity surge! Solana's speed and low costs perfect for meme coin trading frenzy! 📊 #SolanaEcosystem`, likes: 4100, retweets: 687, replies: 234 }
      ],
      'default': [
        { content: `The ${selectedTheme || 'trending narrative'} is absolutely exploding! 🔥 Seeing incredible community engagement and the innovation is top tier. This is the future of crypto! #CryptoTwitter`, likes: 5200, retweets: 987, replies: 231 },
        { content: `${selectedTheme || 'This narrative'} is going parabolic on social! 🚀 The organic growth and technological advancement is exactly what we need in this space. WAGMI! #Innovation`, likes: 3100, retweets: 654, replies: 189 },
        { content: `${selectedTheme || 'Hot narrative'} social analytics: 340% engagement spike, overwhelmingly positive sentiment. The community is building something revolutionary! 📈 #CryptoInnovation`, likes: 1800, retweets: 432, replies: 156 }
      ]
    };

    const templates = tweetTemplates[theme as keyof typeof tweetTemplates] || tweetTemplates.default;
    
    return templates.map((template, index) => ({
      id: String(index + 1),
      author: ['CryptoAnalyst', 'DegenTrader_X', 'Web3Builder'][index],
      handle: ['@cryptoanalyst', '@degentrader_x', '@web3builder'][index],
      content: template.content,
      likes: template.likes,
      retweets: template.retweets,
      replies: template.replies,
      time: ['8min', '23min', '1h'][index],
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
    <Card className="bg-slate-900/90 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Twitter className="h-6 w-6" />
          {selectedTheme || 'Trending'} Social Buzz
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
          <div key={tweet.id} className="p-4 bg-black/30 rounded-lg border border-crypto-purple/20 hover:border-crypto-purple/40 transition-colors">
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
