git init
git remote add origin https://github.com/YOUR_USERNAME/sword-generator.git
git add .
git commit -m "Initial commit"
git push -u origin main

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const swordTemplate = {
  name: "",
  type: "",
  rarity: "",
  material: "",
  element: "",
  origin: "",
  alignment: "",
  abilities: [],
  backstory: "",
  imagePrompt: ""
};

export default function SwordGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [sword, setSword] = useState(null);

  const generateSword = async () => {
    setLoading(true);
    const res = await fetch("/api/generate-sword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setSword(data);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">⚔️ Sword Generator</h1>
      <Textarea
        placeholder="Enter your sword prompt (e.g. A fire sword with ancient power)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={generateSword} disabled={loading}>
        {loading ? "Generating..." : "Generate Sword"}
      </Button>

      {sword && (
        <Card className="mt-6">
          <CardContent className="space-y-2">
            <h2 className="text-xl font-bold">{sword.name}</h2>
            <p><strong>Type:</strong> {sword.type}</p>
            <p><strong>Rarity:</strong> {sword.rarity}</p>
            <p><strong>Element:</strong> {sword.element}</p>
            <p><strong>Material:</strong> {sword.material}</p>
            <p><strong>Origin:</strong> {sword.origin}</p>
            <p><strong>Alignment:</strong> {sword.alignment}</p>
            <p><strong>Abilities:</strong> {sword.abilities.join(", ")}</p>
            <p className="italic">{sword.backstory}</p>
            <img src={sword.imageUrl} alt="Generated Sword" className="rounded-xl border mt-4" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
