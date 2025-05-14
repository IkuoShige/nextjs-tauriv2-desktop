// filepath: /home/ikuo/ui_play/nextjs-tauriv2-desktop/tauri-app/src/app/file-explorer/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FadeIn, SlideIn, ScrollReveal } from "@/components/ui/animations";
import { toast } from "@/components/ui/toaster";
import { ChevronLeft, File, Folder, Eye } from "lucide-react";

export default function FileExplorerPage() {
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectFile = async () => {
    try {
      setIsLoading(true);
      const { open } = await import('@tauri-apps/plugin-dialog');
      const selected = await open({
        multiple: false,
        filters: [{
          name: 'Text',
          extensions: ['txt', 'md', 'json', 'js', 'ts', 'html', 'css']
        }]
      });
      
      if (selected) {
        setSelectedPath(selected as string);
        setError("");
        toast.success("ファイルが選択されました");
      }
    } catch (err) {
      console.error("ファイル選択エラー:", err);
      setError("ファイルを選択できませんでした");
      toast.error("ファイルを選択できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  const readFile = async () => {
    if (!selectedPath) {
      setError("ファイルが選択されていません");
      toast.error("ファイルが選択されていません");
      return;
    }

    try {
      setIsLoading(true);
      const { readTextFile } = await import('@tauri-apps/plugin-fs');
      const content = await readTextFile(selectedPath);
      setFileContent(content);
      setError("");
      toast.success("ファイルを読み込みました");
    } catch (err) {
      console.error("ファイル読み込みエラー:", err);
      setError("ファイルを読み込めませんでした");
      setFileContent("");
      toast.error("ファイルを読み込めませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground p-4 md:p-6">
      {/* 装飾的な背景要素 */}
      <FadeIn>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="circle-blur w-96 h-96 bg-green-400/20 top-1/4 -right-48"></div>
          <div className="circle-blur w-96 h-96 bg-blue-400/20 -bottom-48 left-1/4"></div>
        </div>
      </FadeIn>
      {/* ヘッダー部分 */}
      <SlideIn>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
          {/* 「戻る」ボタンのスタイルを修正 */}
          <Link href="/">
            <Button variant="outline" className="text-primary hover:bg-accent hover:text-accent-foreground">
              <ChevronLeft className="mr-2 h-5 w-5" />
              戻る
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">ファイルエクスプローラ</h1>
          <div className="w-24"></div> {/* 戻るボタンとのバランスを取るためのスペーサー調整 */}
        </div>
      </SlideIn>
      <ScrollReveal>
        <Card className="w-full max-w-4xl mx-auto card-hover glass">
          <CardHeader>
            <div className="flex items-center">
              <Folder className="mr-2 h-5 w-5 text-blue-500" />
              <CardTitle>ファイル操作</CardTitle>
            </div>
            <CardDescription>
              Tauriのファイルシステムプラグインを使用してファイルを読み込みます
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ファイル選択部分 */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
              <div className="relative flex-1">
                <Input
                  value={selectedPath}
                  readOnly
                  placeholder="ファイルを選択してください"
                  className="pr-10 bg-background/50 border-primary/20"
                />
                {selectedPath && (
                  <File className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                )}
              </div>
                {/* 「ファイル選択」ボタンのスタイルをモダン化 */}
                <Button 
                  onClick={handleSelectFile} 
                  className="bg-blue-500 hover:bg-blue-600 text-primary-foreground"
                  disabled={isLoading}
                >
                  ファイルを選択
                </Button>
              {/* </HoverScale> */}
            </div>
          
            {/* ファイル読み込みボタン */}
            {selectedPath && (
                (<Button 
                  onClick={readFile} 
                  variant="outline" 
                  className="w-full glass hover:bg-primary/10"
                  disabled={isLoading}
                >
                  <Eye className="mr-2 h-4 w-4" />ファイルを読み込む
                                  </Button>)
              // </HoverScale>
            )}
            
            {/* ローディング表示 */}
            {isLoading && (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            
            {/* エラー表示 */}
            {error && (
              <FadeIn>
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 text-destructive flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              </FadeIn>
            )}
            
            {/* ファイル内容表示 */}
            {fileContent && (
              <FadeIn>
                <div className="p-4 rounded-lg bg-muted/80 backdrop-blur-sm border border-border">
                  <div className="flex items-center mb-3">
                    <File className="mr-2 h-5 w-5 text-primary" />
                    <h3 className="font-heading font-semibold">ファイル内容:</h3>
                  </div>
                  <div className="relative">
                    <pre className="whitespace-pre-wrap max-h-[400px] overflow-auto p-3 rounded bg-background/50">{fileContent}</pre>
                    <div className="absolute top-0 right-0 left-0 h-6 bg-gradient-to-b from-background/50 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 left-0 h-6 bg-gradient-to-t from-background/50 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </FadeIn>
            )}
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
