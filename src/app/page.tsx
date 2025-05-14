"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
// シンプル化のため、一旦アニメーションコンポーネントのいくつかをコメントアウトまたは削除検討
// import { FadeIn, ScrollReveal, HoverScale } from "@/components/ui/animations"; 
import { 
  FileText, 
  ServerCog, 
  Zap, 
  LayoutDashboard, 
  Cpu, 
  Info,
  Globe,
  Code,
  Monitor
} from "lucide-react";

export default function Home() {
  const [greeting, setGreeting] = useState("");

  const greet = async () => {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const message = await invoke("greet", { name: "Tauri User" });
      setGreeting(message as string);
    } catch (error) {
      console.error("Error invoking Tauri API:", error);
      setGreeting("Error connecting to Tauri backend");
    }
  };

  return (
    // p-8 から p-12 や p-16 に変更して余白を増やすことを検討
    <main className="flex min-h-screen flex-col items-center justify-start p-12 bg-background relative overflow-hidden">
      {/* 装飾的な背景要素 - 透明度やサイズを調整して控えめに */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="circle-blur w-[30rem] h-[30rem] bg-primary/5 -top-40 -right-40 opacity-30"></div>
        <div className="circle-blur w-[25rem] h-[25rem] bg-blue-500/5 bottom-[-10rem] -left-40 opacity-20"></div>
        {/* <div className="circle-blur w-[20rem] h-[20rem] bg-green-500/5 top-1/2 left-1/3 opacity-30"></div> */}
      </div>
      <div className="flex flex-col items-center w-full mb-16 mt-8"> {/* 上下のマージン調整 */}
        {/* <FadeIn> */} {/* アニメーションは控えめに */}
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-center">
            Next.js + Tauri v2 + shadcn/ui Demo
          </h1>
          <p className="text-muted-foreground text-lg text-center mb-10 max-w-xl">
            シンプルでモダンなデスクトップ体験を。
          </p>
        {/* </FadeIn> */}
      </div>
      <div className="w-full max-w-4xl"> {/* max-w を少し調整 */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50 p-1 rounded-lg"> {/* 背景色を調整、パディングと角丸を調整 */}
            <TabsTrigger value="dashboard" className="py-2.5 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"> {/* アクティブ時のスタイル調整 */}
              <LayoutDashboard className="h-4 w-4 mr-2" />
              ダッシュボード
            </TabsTrigger>
            <TabsTrigger value="features" className="py-2.5 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md">
              <Zap className="h-4 w-4 mr-2" />
              機能
            </TabsTrigger>
            <TabsTrigger value="about" className="py-2.5 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md">
              <Info className="h-4 w-4 mr-2" />
              概要
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-0 space-y-6"> {/* space-y を調整 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* gap を調整 */}
              {/* <ScrollReveal> */}
                <Card className="bg-card/60 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300"> {/* glassクラスの代わりに直接スタイル指定、ホバー効果調整 */}
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
                        <FileText className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg font-semibold">ファイル操作</CardTitle>
                    </div>
                    {/* <CardDescription>ファイルの閲覧と管理</CardDescription> */}
                  </CardHeader>
                  <CardContent className="flex flex-col">
                    <p className="text-muted-foreground text-sm mb-6">
                      システム上のファイルを直感的に閲覧・管理できます。
                    </p>
                    {/* <HoverScale className="mt-auto"> */}
                      {/* LinkコンポーネントをButtonから分離、passHrefを削除 */}
                      <Link href="/file-explorer">
                        <Button asChild={false} className="w-full bg-blue-500 hover:bg-blue-600 text-primary-foreground">
                          {/* Linkの子要素としてaタグは不要 */}
                          <FileText className="h-4 w-4 mr-2" /> {/* アイコンとテキストの間にマージン追加 */}
                          ファイルエクスプローラ
                        </Button>
                      </Link>
                    {/* </HoverScale> */}
                  </CardContent>
                </Card>
              {/* </ScrollReveal> */}
              
              {/* <ScrollReveal delay={0.1}> */}
                <Card className="bg-card/60 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="p-2.5 rounded-lg bg-green-500/10 text-green-500">
                        <Cpu className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg font-semibold">システム情報</CardTitle>
                    </div>
                    {/* <CardDescription>デバイスとシステムの情報を表示</CardDescription> */}
                  </CardHeader>
                  <CardContent className="flex flex-col">
                    <p className="text-muted-foreground text-sm mb-6">
                      デバイスのパフォーマンスや詳細情報をリアルタイムで確認。
                    </p>
                    {/* <HoverScale className="mt-auto"> */}
                      {/* LinkコンポーネントをButtonから分離、passHrefを削除 */}
                      <Link href="/system-info">
                        <Button asChild={false} variant="outline" className="w-full border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-600">
                          {/* Linkの子要素としてaタグは不要 */}
                          <ServerCog className="h-4 w-4 mr-2" /> {/* アイコンとテキストの間にマージン追加 */}
                          システム情報
                        </Button>
                      </Link>
                    {/* </HoverScale> */}
                  </CardContent>
                </Card>
              {/* </ScrollReveal> */}
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="mt-0 space-y-6">
            <Card className="bg-card/60 backdrop-blur-md border-border/50 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-500">
                    <Zap className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-semibold">主な機能</CardTitle>
                </div>
                {/* <CardDescription>このアプリケーションの主な特徴</CardDescription> */}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <FadeIn delay={0.1}> */}
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Globe className="h-5 w-5 text-blue-500" />
                        <h3 className="font-medium">クロスプラットフォーム</h3>
                      </div>
                      <p className="text-muted-foreground text-xs">Windows、macOS、Linuxで動作します。</p>
                    </div>
                  {/* </FadeIn> */}
                  
                  {/* <FadeIn delay={0.2}> */}
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-medium">高速パフォーマンス</h3>
                      </div>
                      <p className="text-muted-foreground text-xs">Rustバックエンドによるネイティブ級の速度。</p>
                    </div>
                  {/* </FadeIn> */}
                  
                  {/* <FadeIn delay={0.3}> */}
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Monitor className="h-5 w-5 text-green-500" />
                        <h3 className="font-medium">モダンUI</h3>
                      </div>
                      <p className="text-muted-foreground text-xs">shadcn/uiによる洗練されたデザイン。</p>
                    </div>
                  {/* </FadeIn> */}
                  
                  {/* <FadeIn delay={0.4}> */}
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Code className="h-5 w-5 text-red-500" />
                        <h3 className="font-medium">テーマ切替</h3>
                      </div>
                      <p className="text-muted-foreground text-xs">ライト/ダークモード対応。</p>
                    </div>
                  {/* </FadeIn> */}
                </div>
                
                <div className="flex flex-col items-center mt-6 pt-6 border-t border-border/50">
                  <p className="text-muted-foreground text-sm mb-3">Tauriバックエンド (Rust) の機能を試す:</p>
                  {/* <HoverScale> */}
                    <Button onClick={greet} className="bg-purple-500 hover:bg-purple-600 text-primary-foreground px-6">
                      Rustバックエンドを呼び出す
                    </Button>
                  {/* </HoverScale> */}
                  
                  {greeting && (
                    // <FadeIn>
                      (<div className="p-3 mt-4 rounded-md bg-muted/50 w-full text-center">
                        <p className="text-sm text-foreground">{greeting}</p>
                      </div>)
                    // </FadeIn>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="about" className="mt-0">
            <Card className="bg-card/60 backdrop-blur-md border-border/50 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-500">
                    <Info className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-semibold">このアプリについて</CardTitle>
                </div>
                {/* <CardDescription>技術スタックと概要</CardDescription> */}
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-muted-foreground text-sm">このアプリケーションは、以下のモダン技術スタックで構築されています：</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-lg bg-muted/30 border border-border/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-500">
                        <Code className="h-4 w-4" />
                      </div>
                      <h3 className="font-medium text-sm">Tauri v2</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">Rust製デスクトップアプリフレームワーク</p>
                  </div>
                  
                  <div className="p-3.5 rounded-lg bg-muted/30 border border-border/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-md bg-sky-500/10 text-sky-500"> {/* 色変更 */}
                        <Globe className="h-4 w-4" />
                      </div>
                      <h3 className="font-medium text-sm">Next.js</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">ReactベースWebフレームワーク</p>
                  </div>
                  
                  <div className="p-3.5 rounded-lg bg-muted/30 border border-border/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-500">
                        <Monitor className="h-4 w-4" />
                      </div>
                      <h3 className="font-medium text-sm">shadcn/ui</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">UIコンポーネントライブラリ</p>
                  </div>
                  
                  <div className="p-3.5 rounded-lg bg-muted/30 border border-border/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-md bg-teal-500/10 text-teal-500"> {/* 色変更 */}
                        <Cpu className="h-4 w-4" />
                      </div>
                      <h3 className="font-medium text-sm">TailwindCSS</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">ユーティリティCSSフレームワーク</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border/50">
                  <SystemInfo />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <footer className="mt-auto pt-12 pb-8 text-center"> {/* フッターを追加 */}
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Modern Desktop App. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

function SystemInfo() {
  const [systemInfo, setSystemInfo] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  const fetchSystemInfo = async () => {
    try {
      setLoading(true);
      const { invoke } = await import("@tauri-apps/api/core");
      const info = await invoke("get_system_info");
      setSystemInfo(info as string);
    } catch (error) {
      console.error("Error fetching system info:", error);
      setSystemInfo("システム情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-center text-md mb-3">システム情報照会</h3>
      <div className="flex justify-center">
        {/* <HoverScale> */}
          <Button 
            onClick={fetchSystemInfo} 
            variant="outline" // ボタンのスタイル変更
            className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary-focus w-full max-w-xs" // 幅を制限
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                読み込み中...
              </>
            ) : (
              <>
                <ServerCog className="mr-2 h-4 w-4" />
                システム情報を取得
              </>
            )}
          </Button>
        {/* </HoverScale> */}
      </div>
      {systemInfo && (
        // <FadeIn>
          (<div className="p-3.5 rounded-lg bg-muted/30 border border-border/30 mt-4">
            <pre className="whitespace-pre-wrap text-xs text-muted-foreground">{systemInfo}</pre>
          </div>)
        // </FadeIn>
      )}
    </div>
  );
}