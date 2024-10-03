import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const singerColors = ["lightgreen", "violet", "pink", "skyblue"];
const Item = styled(Paper)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor || '#000',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  height: 80,
  width: 200,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: '#000',
  margin: '0 10px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  textDecoration: 'none',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 1)', // Added shadow for depth
}));
export default function Lyrics() {
  const [selectedSinger, setSelectedSinger] = React.useState(null);
  const [lyrics, setLyrics] = React.useState("");
  const [allLyrics, setAllLyrics] = React.useState([]);
  const singers = [
    { name: "First Singer", path: "/singer/first", color: singerColors[0] },
    { name: "Second Singer", path: "/singer/second", color: singerColors[1] },
    { name: "Third Singer", path: "/singer/third", color: singerColors[2] },
    { name: "Fourth Singer", path: "/singer/fourth", color: singerColors[3] }
  ];
  React.useEffect(() => {
    setSelectedSinger(singers[0]);
  }, []);
  const handleSingerClick = (singer) => {
    if (selectedSinger && lyrics) {
      handleLyricsAutoSubmit();
    }
    setSelectedSinger(singer);
    setLyrics("");
  };
  const handleLyricsAutoSubmit = () => {
    if (lyrics) {
      setAllLyrics(prev => [
        ...prev,
        { text: lyrics, singer: selectedSinger.name, color: selectedSinger.color }
      ]);
      setLyrics("");
    }
  };
  return (
<Router>
<Box sx={{ textAlign: 'center', padding: '90px 0', fontSize: '28px', fontWeight: 'bold', marginLeft: '100px', color: 'black' }}>
        Complete the Lyrics
</Box>
<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', marginLeft: '100px' }}>
<Grid container spacing={2} columns={12} justifyContent="center">
          {singers.map((singer, index) => (
<Grid item key={index}>
<Link to={singer.path} style={{ textDecoration: 'none' }} onClick={() => handleSingerClick(singer)}>
<Item bgcolor={singer.color}>{singer.name}</Item>
</Link>
</Grid>
          ))}
</Grid>
</Box>
<Routes>
        {singers.map((singer) => (
<Route
            key={singer.path}
            path={singer.path}
            element={<SingerPage singer={singer.name} lyrics={lyrics} setLyrics={setLyrics} selectedSinger={selectedSinger} />}
          />
        ))}
</Routes>
<Box sx={{ marginLeft: '100px', paddingTop: '20px' }}>
<h2>Lyrics History</h2>
<Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2, maxHeight: '200px', overflowY: 'auto' }}>
          {}
          {allLyrics.map((lyric, index) => (
<Box key={index} sx={{ backgroundColor: lyric.color, padding: '8px', margin: '10px 0', borderRadius: '4px', color: 'black', fontSize: '40px', }}>
              {lyric.text}
</Box>
          ))}
          {}
          {lyrics && selectedSinger && (
<Box
              sx={{
                backgroundColor: selectedSinger.color,
                fontSize: '40px',
                padding: '8px',
                margin: '10px 0',
                borderRadius: '4px',
                color: 'black'
              }}
>
              {lyrics}
</Box>
          )}
</Box>
</Box>
</Router>
  );
}
// SingerPage component with text field
function SingerPage({ singer, lyrics, setLyrics, selectedSinger }) {
  // Show the text field if a singer is selected
  const isVisible = selectedSinger && selectedSinger.name === singer;
  return (
<Box sx={{ padding: 3, marginLeft: '100px', backgroundColor: 'green', borderRadius: '8px', boxShadow: 1 }}>
<h2>{singer}</h2>
      {isVisible && (
<>
<input
            type="text"
            placeholder="Enter lyrics"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            style={{
              width: '50%',
              padding: '8px',
              marginBottom: '5px',
              fontSize: '44px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fff'
            }}
          />
</>
      )}
</Box>
  );
}