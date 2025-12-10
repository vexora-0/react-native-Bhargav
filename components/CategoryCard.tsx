import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  category: {
    id: number;
    name: string;
    icon: string;
    color: string;
  };
  productCount: number;
  onPress: () => void;
};

const CategoryCard = ({ category, productCount, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${category.color} rounded-xl p-4 mb-4 shadow-sm`}
      style={{ width: "48%" }}
    >
      <Text className="text-4xl mb-2">{category.icon}</Text>
      <Text className="text-lg font-bold text-gray-800">{category.name}</Text>
      <Text className="text-sm text-gray-600">{productCount} products</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

