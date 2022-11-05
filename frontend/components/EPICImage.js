export default function EPICImage({ date, id }) {
  return (
    <div>
      <img
        style={{
          width: '100%',
          height: 'auto'
        }}
        src={
          `https://api.nasa.gov/EPIC/archive/natural/${date.split('-').join('/')}/png/${id}.png?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
        }
      />
    </div>
  );
}