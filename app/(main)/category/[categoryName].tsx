import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getProducts, Product } from "../../../utils/productApi";

const CategoryDetail = () => {
  const router = useRouter();
  const { categoryName } = useLocalSearchParams<{ categoryName?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof categoryName === "string") {
      loadProducts(categoryName);
    }
  }, [categoryName]);

  const loadProducts = async (name: string) => {
    try {
      setError(null);
      setLoading(true);
      const data = await getProducts(name);
      setProducts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const title =
    typeof categoryName === "string" && categoryName.length > 0
      ? categoryName
      : "Category";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-4 bg-emerald-600">
        <TouchableOpacity
          className="mr-3"
          onPress={() => {
            router.back();
          }}
        >
          <Text className="text-white text-lg">←</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1">
          {title} Products
        </Text>
        <TouchableOpacity
          className="bg-white/20 px-3 py-1 rounded-full"
          onPress={() => typeof categoryName === "string" && loadProducts(categoryName)}
        >
          <Text className="text-white text-sm">Refresh</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#059669" />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-red-500 mb-2">Error: {error}</Text>
          <TouchableOpacity
            className="bg-emerald-600 px-4 py-2 rounded-lg"
            onPress={() =>
              typeof categoryName === "string" && loadProducts(categoryName)
            }
          >
            <Text className="text-white font-semibold text-sm">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : products.length === 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-gray-600">
            No products found for this category.
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) =>
            (item._id || item.name || index).toString()
          }
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="bg-white rounded-xl p-3 mb-3 shadow-sm border border-gray-100 flex-row">
              <View className="w-20 h-20 bg-gray-50 rounded-lg items-center justify-center overflow-hidden mr-3">
                {item.imageUrl ? (
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                ) : (
                  <Text className="text-3xl">🛒</Text>
                )}
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-800">
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-500">
                  {item.category || "General"}
                </Text>
                <Text className="text-lg font-bold text-emerald-600 mt-1">
                  ₹{item.price}
                </Text>
                {item.stock !== undefined && (
                  <Text className="text-xs text-gray-500 mt-1">
                    Stock: {item.stock}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default CategoryDetail;

