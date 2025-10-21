import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PieChart, Lock, Shield, BarChart3 } from "lucide-react";

export const ActivityFeedSection = () => (
  <section className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <Card className="gradient-card border-border/50 h-full text-left">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center">
                <PieChart className="w-5 h-5 text-primary mr-2 text-quantum-red" />
                Live Activity
              </CardTitle>
              <CardDescription>
                Real-time trading activity across all markets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock activity items */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/30 hover:border-primary/30 transition-all">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3 text-quantum-red">
                      A
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Alice</span>
                      <span className="text-muted-foreground"> bought </span>
                      <span className="text-success font-medium">100 YES</span>
                      <span className="text-muted-foreground"> tokens in </span>
                      <span className="font-medium text-foreground">
                        Bitcoin $100K
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-muted-foreground">
                      2m ago
                    </span>
                    <span className="text-xs text-success">+$65.00</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/30 hover:border-primary/30 transition-all">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3 text-quantum-red">
                      B
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Bob</span>
                      <span className="text-muted-foreground"> sold </span>
                      <span className="text-destructive font-medium">
                        50 NO
                      </span>
                      <span className="text-muted-foreground"> tokens in </span>
                      <span className="font-medium text-foreground">
                        GPT-5 Release
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-muted-foreground">
                      5m ago
                    </span>
                    <span className="text-xs text-destructive">-$29.00</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/30 hover:border-primary/30 transition-all">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3 text-quantum-red">
                      C
                    </div>
                    <div>
                      <span className="font-medium text-foreground">
                        Charlie
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        created market{" "}
                      </span>
                      <span className="font-medium text-foreground">
                        Tesla Stock Prediction
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">10m ago</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/30 hover:border-primary/30 transition-all">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3 text-quantum-red">
                      D
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Diana</span>
                      <span className="text-muted-foreground">
                        {" "}
                        resolved market{" "}
                      </span>
                      <span className="font-medium text-foreground">
                        ETH Price $3000+
                      </span>
                      <span className="text-success font-medium"> YES</span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">22m ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3">
          <Card className="bg-card border-border/50 h-full">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center">
                <Lock className="w-5 h-5 text-primary mr-2" />
                Security
              </CardTitle>
              <CardDescription>Your funds are always secure</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h4 className="font-medium">Blockchain Secured</h4>
                  <p className="text-sm text-muted-foreground">
                    All transactions secured by Avalanche's C-Chain
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium">Non-Custodial</h4>
                  <p className="text-sm text-muted-foreground">
                    You always control your own funds
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium">Transparent Oracles</h4>
                  <p className="text-sm text-muted-foreground">
                    Fair and verifiable market resolutions
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Learn More About Security
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
);
