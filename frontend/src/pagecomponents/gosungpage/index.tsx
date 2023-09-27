import React, { useState, useEffect } from 'react';
import GosungKakaoMapComponent from './components/kakaomap';
import GosungSideBar from './components/sidebar';
import { StyledSideBarContainer, StyledGosungPage, StyledSideBarParent } from './Gosung.styled';
import GosungSideList from './components/sidelist';
import GosungCloseButton from '../../components/closebutton';
import GosungCategory from './components/foodcategory';
import GosungRestaurantDetail from './components/restaurantdetail';
import { useRestaurantDetailStore } from '../../stores/gosung/restaurants/useRestaurantDetailApiStore';
import { useMediaQuery } from 'react-responsive';
import GosungMobile from '../../mobilepagecomponents/gosungmobile';
import { useSideBarStore } from '../../stores/gosung/useSideBarStore';
import GosungAccomoDetail from './components/accomodetail';
import GosungTourismDetail from './components/tourismdetail';

const GosungComponent = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });
  const [showSideList, setShowSideList] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const selectedCategory = useSideBarStore((state) => state.selectedCategory);

  const handleButtonClick = () => {
    setShowSideList(!showSideList);
    setShowDetails(!showDetails);
  };

  const { restaurantDetail } = useRestaurantDetailStore();

  useEffect(() => {
    if (Object.keys(restaurantDetail).length > 0) {
      setShowDetails(true);
    }
  }, [restaurantDetail]);

  let DetailComponent;

  switch (selectedCategory) {
    case '맛집':
      DetailComponent = <GosungRestaurantDetail />;
      break;
    case '숙소':
      DetailComponent = <GosungAccomoDetail />;
      break;
    case '관광':
      DetailComponent = <GosungTourismDetail />;
      break;
    default:
      DetailComponent = null;
  }

  return (
    <>
      {!isMobile ? (
        <StyledGosungPage>
          <GosungSideBar />
          <StyledSideBarParent>
            <StyledSideBarContainer>
              {showSideList && <GosungSideList />}
              {showDetails && DetailComponent}
              <GosungCloseButton onClick={handleButtonClick} />
            </StyledSideBarContainer>
          </StyledSideBarParent>

          <GosungKakaoMapComponent />
        </StyledGosungPage>
      ) : (
        <GosungMobile></GosungMobile>
      )}
    </>
  );
};

export default GosungComponent;
