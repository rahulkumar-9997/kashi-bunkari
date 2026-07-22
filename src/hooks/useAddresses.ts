"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addressService, stateService } from "@/services/addressService";
import type { AddressPayload } from "@/types/address";

export function useAddresses(enabled: boolean = true) {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: () => addressService.list().then((r) => r.data),
    enabled,
  });
}

export function useStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: () => stateService.list().then((r) => r.data),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useAddAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddressPayload) => addressService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses"] }),
  });
}

export function useUpdateAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: AddressPayload }) =>
      addressService.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses"] }),
  });
}

export function useDeleteAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => addressService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses"] }),
  });
}

export function useSetDefaultAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => addressService.setDefault(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses"] }),
  });
}