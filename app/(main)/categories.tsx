import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import CategoryCard from "../../components/CategoryCard";
import { categories } from "../../utils/constants";
import { getProducts, Product } from "../../utils/productApi";

const CategoriesScreen = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const counts = useMemo(() => {
    const tally: Record<string, number> = {};
    products.forEach((p) => {
      if (!p.category) return;
      tally[p.category] = (tally[p.category] || 0) + 1;
    });
    return tally;
  }, [products]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-emerald-600 px-4 py-5">
        <Text className="text-white text-2xl font-bold">
          Browse Categories
        </Text>
        <Text className="text-white/90 text-sm mt-1">
          Pick a category to see matching products
        </Text>
      </View>

      <View className="flex-1 px-4 pt-4">
        {loading ? (
          <View className="items-center justify-center flex-1">
            <ActivityIndicator size="large" color="#059669" />
          </View>
        ) : error ? (
          <View className="items-center justify-center flex-1">
            <Text className="text-red-500 mb-3">Error: {error}</Text>
            <TouchableOpacity
              className="bg-emerald-600 px-4 py-2 rounded-lg"
              onPress={loadProducts}
            >
              <Text className="text-white font-semibold text-sm">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : categories.length === 0 ? (
          <View className="items-center justify-center flex-1">
            <Text className="text-gray-600">No categories available</Text>
          </View>
        ) : (
          <FlatList
            data={categories}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingBottom: 16 }}
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                productCount={counts[item.name] || 0}
                onPress={() => router.push(`/category/${item.name}`)}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoriesScreen;