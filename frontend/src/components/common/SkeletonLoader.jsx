const SkeletonLoader = ({ variant = 'text', count = 1 }) => {
  const variants = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    card: 'h-48 w-full',
    image: 'h-64 w-full',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-32',
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton ${variants[variant]} mb-3`} />
      ))}
    </>
  );
};

export default SkeletonLoader;
