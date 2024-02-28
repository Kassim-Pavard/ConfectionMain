const Banner = () => {
  const clipPathStyle = {
    clipPath: 'polygon(0 0%, 100% 0, 100% 100%, 0 100%)',
    width: '100%',
    height: '10em',
  };

  return (
    <div className="ui leaderboard test ad" style={clipPathStyle}>
      <img
        src="/images/scene-realiste-vetements-vente-jardin-quartier.png"
        alt="Banner Image"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default Banner;

