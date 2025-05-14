"use client";

import { useState, useEffect } from "react";

// Tauriコマンドを呼び出すためのフック
export function useInvoke<T>(command: string, args?: Record<string, unknown>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const invoke = async (newArgs?: Record<string, unknown>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // importを@tauri-apps/api/coreに修正
      const { invoke: tauriInvoke } = await import("@tauri-apps/api/core");
      const result = await tauriInvoke(command, newArgs || args);
      setData(result as T);
      return result as T;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, invoke };
}

// OSの情報を取得するフック
export function useOsInfo() {
  const [osInfo, setOsInfo] = useState<{
    type: string;
    version: string;
    arch: string;
  } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOsInfo = async () => {
      try {
        const { type, arch, version } = await import("@tauri-apps/plugin-os");
        const osType = await type();
        const osArch = await arch();
        const osVersion = await version();
        
        setOsInfo({
          type: osType,
          version: osVersion,
          arch: osArch
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOsInfo();
  }, []);

  return { osInfo, error, isLoading };
}

// ファイル選択ダイアログを開くユーティリティ
export async function openFileDialog(options?: {
  multiple?: boolean;
  filters?: { name: string; extensions: string[] }[];
}): Promise<string | string[] | null> {
  try {
    const { open } = await import('@tauri-apps/plugin-dialog');
    return await open(options);
  } catch (err) {
    console.error("File dialog error:", err);
    return null;
  }
}

// ファイルの内容を読み込むユーティリティ
export async function readTextFromFile(path: string): Promise<string | null> {
  try {
    const { readTextFile } = await import('@tauri-apps/plugin-fs');
    return await readTextFile(path);
  } catch (err) {
    console.error("File read error:", err);
    return null;
  }
}
