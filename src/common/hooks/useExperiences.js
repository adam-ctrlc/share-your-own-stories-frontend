import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { api, SORT_OPTIONS } from "../libs/api";

const buildExperiencesKey = ({ page, limit, search, sort }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort,
  });

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  return `/experiences?${params.toString()}`;
};

const fetcher = (url) => api.get(url).then((res) => res.data);

export function useExperiences({
  page = 1,
  limit = 20,
  search = "",
  sort = SORT_OPTIONS.LATEST,
} = {}) {
  const key = buildExperiencesKey({ page, limit, search, sort });

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 2000,
  });

  return {
    experiences: data?.experiences || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 0,
    isLoading,
    error: error?.response?.data?.error || error?.message,
    mutate,
  };
}

export function useExperience(id) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/experiences/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    experience: data?.data,
    isLoading,
    error: error?.response?.data?.error || error?.message,
    mutate,
  };
}

async function createExperience(url, { arg }) {
  const { data } = await api.post(url, arg);
  return data;
}

export function useCreateExperience() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/experiences",
    createExperience
  );

  return {
    create: trigger,
    isCreating: isMutating,
    error: error?.response?.data?.error || error?.message,
  };
}

export { SORT_OPTIONS };
