import { Label } from "@radix-ui/react-label";
import { CheckIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { cn } from "@/lib/utils";
import { useConfig } from "@/lib/hooks/use-config";
import { ThemeWrapper } from "@/components/ui/theme-wrapper";
import { Button } from "./button";
import { baseColors } from "@/registry/registry-colors";
import { Skeleton } from "@/registry/new-york/ui/skeleton";
import { useGetManager } from "@/app/(private)/dashboard/hooks/useGetManager";
import { extractBaseColorFromTheme } from "@/shared/utils/themeUtils";
import { ThemeStrings } from "@/registry/registry-colors";

interface Props {
  onChange?: (theme: ThemeStrings) => void;
}

const ThemeCustomizer = ({ onChange }: Props) => {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme: mode } = useTheme();
  const [config, setConfig] = useConfig();
  const { data } = useGetManager();

  React.useEffect(() => {
    setMounted(true);
    data?.palette &&
      setConfig({
        ...config,
        theme: extractBaseColorFromTheme(data.palette),
      });
  }, [data]);

  return (
    <ThemeWrapper
      defaultTheme="zinc"
      className="flex flex-col space-y-4 md:space-y-6"
    >
      <div className="flex items-start pt-4 md:pt-0">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            Personalizar
          </div>
          <div className="text-xs text-muted-foreground max-w-xs">
            Selecione a cor tema para o aplicativo e torne o processo de
            agendamento dos seus clientes ainda mais satisfatório.
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <Label className="text-xs">Color</Label>
          <div className="grid grid-cols-3 gap-2">
            {baseColors.map((theme) => {
              const isActive = config.theme === theme.name;

              return mounted ? (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={theme.name}
                  onClick={() => {
                    setConfig({
                      ...config,
                      theme: theme.name,
                    });
                    onChange?.(`theme-${theme.name}`);
                  }}
                  className={cn(
                    "justify-start",
                    isActive && "border border-primary",
                  )}
                  style={
                    {
                      "--theme-primary": `hsl(${
                        theme?.activeColor[mode === "dark" ? "dark" : "light"]
                      })`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]",
                    )}
                  >
                    {isActive && <CheckIcon className="h-4 w-4 text-white" />}
                  </span>
                  {theme.label}
                </Button>
              ) : (
                <Skeleton className="h-8 w-full" key={theme.name} />
              );
            })}
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
};

ThemeCustomizer.displayName = "ThemeCustomizer";

export { ThemeCustomizer };
