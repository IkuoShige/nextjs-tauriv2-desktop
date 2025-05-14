"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { FadeIn, SlideIn, ScrollReveal, Stagger, StaggerItem } from "@/components/ui/animations";
import { ModernAreaChart } from "@/components/ui/charts";
import { toast } from "@/components/ui/toaster";
import { LucideActivity, LucideServer, LucideHardDrive, LucideSettings, LucideChevronLeft } from "lucide-react";

export default function SystemInfo() {
  const [systemInfo, setSystemInfo] = useState<string>("");
  const [osInfo, setOsInfo] = useState<{ type: string; version: string; arch: string } | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // テーマの切り替えがクライアントサイドでのみ行われるように
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchSystemInfo = async () => {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const info = await invoke("get_system_info");
      setSystemInfo(info as string);
      toast.success("システム情報を取得しました");
    } catch (error) {
      console.error("Error fetching system info:", error);
      setSystemInfo("システム情報の取得に失敗しました");
      toast.error("システム情報の取得に失敗しました");
    }
  };

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
    } catch (error) {
      console.error("Error fetching OS info:", error);
    }
  };

  useEffect(() => {
    fetchOsInfo();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  // リソース使用量を模したデータ
  const resourceData = [
    { name: "0:00", value: 30 },
    { name: "2:00", value: 25 },
    { name: "4:00", value: 20 },
    { name: "6:00", value: 35 },
    { name: "8:00", value: 55 },
    { name: "10:00", value: 70 },
    { name: "12:00", value: 65 },
    { name: "14:00", value: 80 },
    { name: "16:00", value: 75 },
    { name: "18:00", value: 60 },
    { name: "20:00", value: 50 },
    { name: "22:00", value: 40 },
  ];

  return (
    <main className="flex min-h-screen flex-col p-8 bg-background gradient-bg">
      {/* 装飾的な背景要素 */}
      <FadeIn>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="circle-blur w-96 h-96 bg-blue-400/30 -top-48 -left-48"></div>
          <div className="circle-blur w-96 h-96 bg-purple-400/20 top-1/3 right-0"></div>
        </div>
      </FadeIn>
      {/* ヘッダー部分 */}
      <SlideIn>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="text-primary hover:bg-accent hover:text-accent-foreground">
                <LucideChevronLeft className="mr-2 h-4 w-4" /> 戻る
              </Button>
            </Link>
            <h1 className="text-3xl font-heading font-bold text-foreground">システム情報</h1>
          </div>
          
          <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
            <Label htmlFor="theme-mode">ダークモード</Label>
            <Switch
              id="theme-mode"
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>
      </SlideIn>
      {/* リソース使用量グラフ */}
      <ScrollReveal>
        <Card className="mb-6 w-full max-w-4xl mx-auto overflow-hidden card-hover glass">
          <CardHeader className="pb-0">
            <div className="flex items-center">
              <LucideActivity className="mr-2 h-5 w-5 text-primary" />
              <CardTitle>リソース使用量</CardTitle>
            </div>
            <CardDescription>システムリソースの使用状況</CardDescription>
          </CardHeader>
          <CardContent>
            <ModernAreaChart 
              data={resourceData}
              colors={["#3b82f6", "#8b5cf6"]}
              formatter={(value: number) => `${value}%`}
            />
          </CardContent>
        </Card>
      </ScrollReveal>
      {/* 情報カード */}
      <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
        <StaggerItem>
          <Card className="card-hover glass">
            <CardHeader>
              <div className="flex items-center">
                <LucideServer className="mr-2 h-5 w-5 text-blue-500" />
                <CardTitle>OSプラグイン情報</CardTitle>
              </div>
              <CardDescription>Tauriのプラグインから取得した情報</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {osInfo ? (
                <div className="space-y-2">
                  <div className="flex items-center p-3 rounded-lg bg-primary/10 hover-glow">
                    <span className="font-semibold w-36">OS:</span>
                    <span>{osInfo.type}</span>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-primary/10 hover-glow">
                    <span className="font-semibold w-36">バージョン:</span>
                    <span>{osInfo.version}</span>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-primary/10 hover-glow">
                    <span className="font-semibold w-36">アーキテクチャ:</span>
                    <span>{osInfo.arch}</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-md bg-muted flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3">OS情報を読み込み中...</span>
                </div>
              )}
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="card-hover glass">
            <CardHeader>
              <div className="flex items-center">
                <LucideHardDrive className="mr-2 h-5 w-5 text-purple-500" />
                <CardTitle>カスタムRust関数</CardTitle>
              </div>
              <CardDescription>カスタムRust関数から取得した情報</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={fetchSystemInfo} 
                className="btn-gradient"
              >
                <LucideSettings className="mr-2 h-4 w-4" />
                詳細情報を取得
              </Button>
              
              {systemInfo && (
                <FadeIn>
                  <div className="p-4 rounded-md bg-muted/80 backdrop-blur-sm border border-border">
                    <pre className="whitespace-pre-wrap">{systemInfo}</pre>
                  </div>
                </FadeIn>
              )}
            </CardContent>
          </Card>
        </StaggerItem>
      </Stagger>
    </main>
  );
}
