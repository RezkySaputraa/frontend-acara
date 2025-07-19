"use client";

import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.contants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebounce from "./useDebounce";
import { ChangeEvent, useState } from "react";

const useChangeUrl = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const debounce = useDebounce();
  const [search, setSearch] = useState<string>(() => {
    return searchParams.get("search") || "";
  });

  const router = useRouter();

  const currentLimit = searchParams.get("limit");
  const currentPage = searchParams.get("page");
  const currentSearch = searchParams.get("search");
  const params = new URLSearchParams(searchParams.toString());

  const setUrl = () => {
    // Buat instance baru (karena SearchParams itu immutable)

    params.set("limit", currentLimit || LIMIT_DEFAULT.toString());
    params.set("page", currentPage || PAGE_DEFAULT.toString());
    params.set("search", currentSearch || "");

    // Replace URL
    router.replace(`${pathname}?${params.toString()}`);
  };

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
    const search = e.target.value;
    setSearch(search);

    debounce(() => {
      params.set("search", search);
      params.set("page", PAGE_DEFAULT.toString());

      router.push(`${pathname}?${params.toString()}`);
    }, DELAY);
  };

  const handleClearSearch = () => {
    params.set("search", "");
    params.set("page", PAGE_DEFAULT.toString());
    setSearch("");

    router.push(`${pathname}?${params.toString()}`);
  };
  return {
    currentLimit,
    currentPage,
    currentSearch,
    setUrl,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    search,
  };
};

export default useChangeUrl;
