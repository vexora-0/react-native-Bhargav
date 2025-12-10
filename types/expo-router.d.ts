declare module "expo-router" {
  export function useRouter(): any;
  export function useLocalSearchParams<
    T extends Record<string, string | string[] | undefined> = Record<
      string,
      string | string[] | undefined
    >
  >(): T;
}

