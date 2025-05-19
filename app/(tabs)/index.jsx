import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import styles from '../../assets/styles/home.style';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constans/colors';
import { formatPublishDate } from '../../libs/utils.js';
import { ActivityIndicator } from 'react-native';
import Loader from '../../components/Loader.jsx';

export default function Home() {

     const { token , logout} = useAuthStore(); 
     const [books, setBooks] = useState([]);
     const [loading, setLoading] = useState(true);
     const [refreshing, setRefreshing]  = useState(false);
     const [page, setPage] = useState(1);
     const [hasMore, setHasMore] = useState(true);

     const fetchBooks = async (pageNum=1, refresh=false) =>{
      try {
        if(refresh) setRefreshing(true);
        else if (pageNum===1) setLoading(true);

        const response = await fetch(`https://bookworm-z84w.onrender.com/api/books?page=${pageNum}&limit=5`, {
          headers: { Authorization: `Bearer ${token}`},
        });

        const data  = await response.json(); 
        if(!response.ok) throw new Error(data.message || "Failed to fetch books");

        // setBooks((prevBooks) => [...prevBooks, ...data.books]);

        const uniqueBooks = refresh || pageNum === 1 ? data.books : Array.from(new Set([...books, ...data.books].map((book)=> book._id))).map((id)=>[
          ...books, ...data.books].find((book)=> book._id === id));
          setBooks(uniqueBooks);

        setHasMore(pageNum < data.totalPages); 
        setPage(pageNum);
      } catch (error) {
        console.log("Error in fetchning book",error)
      } finally{
        if(refresh) setRefreshing(false); 
        else setLoading(false);
      }
     }

     useEffect(()=>{
      fetchBooks();
     },[]);

     const renderItem = ({ item }) =>(

      <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user.profileImage }} style={styles.avatar}/>
          <Text style={styles.username}>{item.user.userName}</Text>
        </View>

      </View>
      <View style={styles.bookImageContainer}> 
        <Image source={item.image} style={styles.bookImage} contentFit='cover'/>
      </View>

       <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>Shared on {formatPublishDate(item.createdAt)}</Text>

      </View>
        
      </View>
     );

     const renderStars = (rating) =>{ 
      const stars = [];
      for (let i = 1; i <= 5; i++){
        stars.push(
          <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={ i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight:2}}/>
        )
      }
      return stars;
     }

     const handleLoadMore = async ()=>{
      if (hasMore && !loading && !refreshing){
        await fetchBooks(page + 1);
      }
     };

    if (loading) return <Loader/>;

  return (
    <View style={styles.container}>
      <FlatList data={books}
      renderItem={renderItem}
      keyExtractor={(item)=> item._id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}

      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}

      ListHeaderComponent={
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BookWorm 🐢</Text>
        <Text style={styles.headerSubtitle}>Discover great reads from thcbcvb e community 👇</Text>      
     </View>
      }

      ListFooterComponent={
        hasMore && books.length > 0 ? (
<ActivityIndicator style={styles.footerLoader} size={"small"} color={COLORS.primary}/>
        ): null
      }

      ListEmptyComponent={
      <View style={styles.emptyContainer}>
         <Text style={styles.headerTitle}>BookWorm is Empty</Text>
        <Text style={styles.emptySubtext}> No recommendations yet  </Text>
    <Text style={styles.emptySubtext}> Be the first to share a book!  </Text>
      </View>


      }
      />
      <TouchableOpacity onPress={logout}> 
        <Text>Logout</Text> 
      </TouchableOpacity>
    </View>
  )
}