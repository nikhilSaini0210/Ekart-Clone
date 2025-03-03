import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React, {ComponentType, FC, useRef, useState} from 'react';
import {dynamicDashboardData as fullData} from '@utils/db';
import AdCarousal from '../organisms/AdCarousal';
import Categories from '../organisms/Categories';
import Sponser from '../organisms/Sponser';
import VerticalList from '../organisms/VerticalList';
import HorizontalList from '../organisms/HorizontalList';
import AnimatedHorizontalList from '../organisms/AnimatedHorizontalList';

interface MainListProps {
  scrollY: any;
}

const sectionComponents: {[key: string]: ComponentType<any>} = {
  ad_carousal: AdCarousal,
  categories: Categories,
  sponser: Sponser,
  vertical_list: VerticalList,
  horizontal_list: HorizontalList,
  animated_horizontal_list: AnimatedHorizontalList,
};

const PAGE_SIZE = 4;

const MainList: FC<MainListProps> = ({scrollY}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState(fullData.slice(0, PAGE_SIZE));
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const prevScrollY = useRef(0);
  const flatListRef = useRef<FlatList>(null);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event?.nativeEvent?.contentOffset.y;
    scrollY.value = currentScrollY;
    prevScrollY.current = currentScrollY;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentPage(1);
      setData(fullData?.slice(0, PAGE_SIZE));
      setIsRefreshing(false);
    }, 3000);
  };

  const handleLoadMore = () => {
    if (isLoadingMore) {
      return;
    }
    if (data?.length >= fullData?.length) {
      return;
    }
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const newData = fullData?.slice(0, nextPage * PAGE_SIZE);
      setData(newData);
      setCurrentPage(nextPage);
      setIsLoadingMore(false);
    }, 4000);
  };

  const renderItem = ({item}: any) => {
    const SectionComponent = sectionComponents[item?.type];
    return SectionComponent ? <SectionComponent data={item} /> : null;
  };

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
      overScrollMode="always"
      onScroll={handleScroll}
      ref={flatListRef}
      scrollEventThrottle={16}
      renderItem={renderItem}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      nestedScrollEnabled
      contentContainerStyle={styles.flatListContainer}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={
        isLoadingMore ? (
          <ActivityIndicator
            size="small"
            color="#888"
            style={styles.activity}
          />
        ) : null
      }
    />
  );
};

export default MainList;

const styles = StyleSheet.create({
  flatListContainer: {
    paddingBottom: Platform.OS === 'android' ? 200 : 300,
  },
  activity: {
    alignSelf: 'center',
    margin: 15,
  },
});
