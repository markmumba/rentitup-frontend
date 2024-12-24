'use client';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { 
  MotionDiv, 
  MotionH1, 
  MotionP, 
  MotionSpan
} from '@/components/motion';

const phrases = ["Rent Any Machine", "Book Any Machine", "Find Any Machine"];
const TypewriterText = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let timeout :any ;

    // Toggle cursor visibility every 530ms
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      const shouldDelayNextChar = !isDeleting && currentText === currentPhrase;
      const shouldStartDeleting = !isDeleting && currentText === currentPhrase;
      const shouldSwitchPhrase = isDeleting && currentText === "";

      // Handle phrase switching
      if (shouldSwitchPhrase) {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        timeout = setTimeout(handleTyping, 200);
        return;
      }

      // Handle typing delay
      if (shouldDelayNextChar) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
          timeout = setTimeout(handleTyping, 200);
        }, 2000);
        return;
      }

      // Handle typing and deleting
      const nextText = isDeleting
        ? currentText.slice(0, -1)
        : currentText + currentPhrase[currentText.length];

      setCurrentText(nextText);
      
      // Set the next timeout
      timeout = setTimeout(
        handleTyping,
        isDeleting ? 100 : 150
      );
    };

    timeout = setTimeout(handleTyping, 100);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [currentText, isDeleting, currentPhraseIndex]);

  return (
    <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
      {currentText}
      <span 
        className={`inline-block w-[4px] h-[60px] ml-2 bg-orange-500 -mb-2
          ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 0.1s' }}
      />
    </h1>
  );
};

export default function ModernHeroSection() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = () => {
    if (searchWord.trim()) {
      router.push(`/machines?query=${encodeURIComponent(searchWord.trim())}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 -z-10" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30 dark:opacity-20 -z-10" />

      <MotionDiv
        className="container mx-auto lg:mt-20 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <TypewriterText />

          <MotionSpan 
            className="block text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 
              to-orange-600 text-transparent bg-clip-text mt-4"
            variants={itemVariants}
          >
            Anytime, Anywhere
          </MotionSpan>

          <MotionP 
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Connect with trusted local machine owners. From construction equipment 
            to specialized tools, find exactly what you need.
          </MotionP>

          <MotionDiv 
            className="flex gap-3 max-w-lg mx-auto"
            variants={itemVariants}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="What machinery do you need?"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 
                  dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 
                  backdrop-blur-sm text-slate-900 dark:text-slate-100 
                  focus:outline-none focus:ring-2 focus:ring-orange-500 
                  transition-all duration-200 shadow-sm"
              />
            </div>
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 
                dark:hover:bg-orange-700 px-8 py-3 text-base font-medium
                transition-all duration-200 text-white shadow-sm"
              onClick={handleSearch}
            >
              Search
            </Button>
          </MotionDiv>

          <MotionDiv 
            className="pt-12 flex flex-col items-center space-y-4"
            variants={itemVariants}
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Trusted by machine owners nationwide
            </p>
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">4.9/5</span>
                <span className="text-sm">(2.5k+ Reviews)</span>
              </div>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold">10,000+</span> Active Users
              </div>
            </div>
          </MotionDiv>
        </div>
      </MotionDiv>
    </div>
  );
}