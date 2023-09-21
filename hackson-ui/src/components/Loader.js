// material-ui
import { CircularProgress, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

// styles
const LoaderBgWrapper = styled('div')({
  position: 'absolute',
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff9',
  zIndex: 101
});

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%'
});

// ==============================|| LOADER ||============================== //
const Loader = ({ show = true, bg }) => {
  if(!show) return false;
  if (bg) {
    return <LoaderBgWrapper><CircularProgress size='3rem' /></LoaderBgWrapper>
  }
  return (
    <LoaderWrapper>
      <LinearProgress color="primary" />
    </LoaderWrapper>
  );
}

export default Loader;
