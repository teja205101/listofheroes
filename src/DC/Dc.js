import React, { useState, useContext, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { cartListContext, heroListLimit, herosContext } from '../App';
import HeroNormalView from '../HeroNormalView/heroNormalView';
import DcCardView from '../DC/DcCardView';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';

function Dc() {
  const [alignment, setAlignment] = React.useState('Plain View');
  const handleChangeForToogle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const addedHeroes = [];
  const [x, setX] = useState(0);
  const listOfHeroes = useContext(herosContext);
  const handleChange = (event, value) => {
    setX(value - 1);
  };
  const { cartNameList, changeNameCartList, cartImgList, changeImgCartList } =
    useContext(cartListContext);

  const { displaySnackBar, setDisplaySnackBar } = useContext(heroListLimit);

  function cartNumberChange(e) {
    changeNameCartList([...cartNameList, listOfHeroes.DC[x].name]);
    changeImgCartList([...cartImgList, listOfHeroes.DC[x].img]);
  }
  const [y, setY] = useState(false);
  useEffect(() => {
    console.log('cartNameList-------', cartNameList);
    const z = cartNameList.length > 1 ? true : false;
    console.log('cartNameList-length-------', cartNameList.length);
    setY(z);
    y
      ? setDisplaySnackBar(
          <>
            <h1 style={{ color: 'red' }}>
              You have {cartNameList.length} reached max Heroes for the Team
            </h1>
          </>,
        )
      : setDisplaySnackBar('');
  }, []);
  useEffect(() => {
    console.log('cartNameList-------', cartNameList);
    const z = cartNameList.length > 1 ? true : false;
    setY(z);
    y
      ? setDisplaySnackBar(
          <>
            <h1 style={{ color: 'red' }}>
              You have {cartNameList.length} reached max Heroes for the Team
            </h1>
          </>,
        )
      : setDisplaySnackBar('');
  }, [cartNameList.length, x]);
  return (
    <>
      <h3 style={{ float: 'right' }}>
        {3 - cartNameList.length} heroe(s) left to select
      </h3>
      <br />
      <ToggleButtonGroup
        color="primary"
        exclusive
        onChange={handleChangeForToogle}
        aria-label="Platform"
      >
        <ToggleButton value="Plain View">
          <CropLandscapeIcon />
        </ToggleButton>
        <ToggleButton value="Card View">
          <ViewCompactIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <div>
        {alignment == 'Card View' ? (
          <>
            <DcCardView />
          </>
        ) : (
          <>
            {HeroNormalView(listOfHeroes.DC[x])}
            <Button
              color="primary"
              onClick={cartNumberChange}
              value={listOfHeroes.DC[x].name}
              variant="outlined"
              fullWidth="true"
              style={{
                paddingLeft: 580,
                fontSize: 20,
              }}
            >
              <div style={{ textAlign: 'center' }}>Add to collection</div>
              <AddIcon />
            </Button>
            <Pagination
              count={listOfHeroes.DC.length}
              onChange={handleChange}
              showFirstButton
              showLastButton
              style={{ bottom: 0, float: 'right', backgroundColor: 'red' }}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Dc;
