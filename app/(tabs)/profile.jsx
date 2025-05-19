import { View, Alert, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import styles from "../../assets/styles/profile.style"
import ProfileHeader from '../../components/ProfileHeader';
import LogoutButton from '../../components/LogoutButton';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constans/colors';
import { Image } from 'expo-image';
import { RefreshControl } from 'react-native';
import { sleep } from '.';
import Loader from '../../components/Loader';

export default function Profile() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
   const [refreshing, setRefreshing] = useState(false);

   const router = useRouter();
  const { token } = useAuthStore();

   const fetchData = async ()=>{
    try {
      setIsLoading(true);

      const response = await fetch("https://bookworm-z84w.onrender.com/api/books/user", {
        headers: { Authorization:  `Bearer ${token}`},
      });

      const data = await response.json();
      if(!response.ok) throw new Error(data.message || "Failed to fetch user books");

      setBooks(data);
      console.log(data)
    } catch (error) {
      console.log("Error fetching data:", error);
      Alert.alert("Error", "Failed to load profile data. pull down refresh")
    }finally { 
      setIsLoading(false);  
    }
   }

   useEffect(()=>{
      fetchData();
   },[]);

    const handleRefresh = async ()=>{
      setRefreshing(true);
      await sleep(500);
      await fetchData();
      setRefreshing(false)
    }
   const handleDeleteBook = async (bookId) =>{
    try {
      const responce = await fetch(`https://bookworm-z84w.onrender.com/api/books/${bookId}`,{
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`},
      });

      const data = await responce.json();
      if(!responce.ok) throw new Error(data.message || "Failed to delete recommendation");

      setBooks(books.filter((book)=> book._id !== bookId));
      Alert.alert("Success", "Recommendation delete successfully");
    } catch (error) {
      Alert.alert("Error",error.message || "Failed to delete recommendation")
    }
   }
 
   const confirmDelete = (bookId)=> {
      Alert.alert("Delete Recommendation", "Are you sure you want delete this recommendation?", [
                { text: "Cancel", style: "cancel"},
                { text: "Delete", onPress: ()=> handleDeleteBook(bookId), style: "destructive"},
            ]);
   }

   const renderBookItem = ({ item }) =>(
    <View style={styles.bookItem}>
      <Image source={item.image} style={styles.bookImage}/>
        <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
        <Text style={styles.bookCaption} numberOfLines={2}>{item.caption}</Text>
        <Text style={styles.bookDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>

        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={()=> confirmDelete(item._id)}>
          <Ionicons name='trash-outline' size={20} color={COLORS.primary}/>
        </TouchableOpacity>
    </View>
    
   )
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
 
     if( isLoading && !refreshing) return <Loader/>
  return (
    <View style={styles.container}>
      <ProfileHeader/>
      <LogoutButton/>

      <View style={styles.booksHeader}>
        <Text style={styles.bookTitle}>Your Recommendations 📚</Text>
        <Text style={styles.booksCount}>{books.length} books</Text>
      </View>

      <FlatList
      data={books}
      renderItem={renderBookItem}
      keyExtractor={(item)=> item._id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.booksList}
      refreshControl={
        <RefreshControl
        onRefresh={handleRefresh}
        refreshing={refreshing}
        colors={[COLORS.primary]}
        tintColor={COLORS.primary}
       />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Ionicons name='book-outline' size={50} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>No recommendations yet</Text>
          <TouchableOpacity style={styles.addButton} onPress={()=> router.push("/create")}>
              <Text style={styles.addButtonText}>Add your first book</Text>
          </TouchableOpacity>
        </View>
      }
      />
    </View>
  )
}  