import { useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomReached) callback();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
};

export default useInfiniteScroll;
