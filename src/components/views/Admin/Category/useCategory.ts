import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/contants/list.contants";
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ChangeEvent, useState } from "react";

const useCategory = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const debounce = useDebounce();

  const currentLimit = searchParams.get("limit");
  const currentPage = searchParams.get("page");
  const currentSearch = searchParams.get("search");
  const params = new URLSearchParams(searchParams.toString());

  const setURL = () => {
    // Buat instance baru (karena SearchParams itu immutable)

    params.set("limit", currentLimit || LIMIT_DEFAULT.toString());
    params.set("page", currentPage || PAGE_DEFAULT.toString());
    params.set("search", currentSearch || "");

    // Replace URL
    router.replace(`${pathname}?${params.toString()}`);
  };

  const getCategories = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await categoryServices.getCategories(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isRefetching: isRefetchingCategory,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["Category", currentPage, currentLimit, currentSearch],
    queryFn: () => getCategories(),
    enabled: !!currentPage && !!currentLimit,
  });

  const handleChangePage = (page: number) => {
    // Update param page
    params.set("page", page.toString());

    // Push URL baru
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    params.set("limit", selectedLimit);
    params.set("page", PAGE_DEFAULT.toString());

    // Push URL baru
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      params.set("search", search);
      params.set("page", PAGE_DEFAULT.toString());

      router.push(`${pathname}?${params.toString()}`);
    }, DELAY);
  };

  const handleClearSearch = () => {
    params.set("search", "");
    params.set("page", PAGE_DEFAULT.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    setURL,
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    currentPage,
    currentLimit,
    currentSearch,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    refetchCategory,

    selectedId,
    setSelectedId,
  };
};

export default useCategory;
