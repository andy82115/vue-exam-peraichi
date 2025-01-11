import { defineStore } from "pinia";
import { FormRemoteDataSource } from "./FormRemoteDatasource";
import type { FormDataSourceType } from "../../domain/IFormRemoteDatasource";

export const useRemoteDataSourceProvider = defineStore("formRemoteDataSource", () => {
  const remoteDataSource: FormDataSourceType = new FormRemoteDataSource();

  return {
    remoteDataSource,
  };
});