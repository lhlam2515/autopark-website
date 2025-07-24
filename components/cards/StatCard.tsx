import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatCard = ({ title, content }: { title: string; content: string }) => {
  return (
    <Card className="border-secondary-500 bg-primary-100 gap-2 rounded-xl border-2">
      <CardHeader>
        <CardTitle className="text-secondary-500 text-center text-2xl font-medium uppercase">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-primary-300 mx-8 rounded-lg px-4 py-2">
        <p className="text-secondary-500 text-center text-3xl font-semibold">
          {content}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
