import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const MoneyGenerator = () => {
  const [customAmount, setCustomAmount] = useState("");
  const [totalEarned, setTotalEarned] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(0);

  const handleGenerate100 = () => {
    generateMoney(100);
  };

  const handleGenerateCustom = () => {
    const amount = parseInt(customAmount);
    if (amount && amount > 0) {
      generateMoney(amount);
    }
  };

  const generateMoney = (amount: number) => {
    setIsGenerating(true);
    setProgress(0);
    setTimer(3);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setTotalEarned((prev) => prev + amount);
          openVirusPage();
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const openVirusPage = () => {
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Системное предупреждение</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                background: red; 
                color: white; 
                text-align: center; 
                padding: 50px;
                font-size: 24px;
              }
              .warning {
                animation: blink 1s infinite;
                font-weight: bold;
                margin: 20px 0;
              }
              @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
              }
            </style>
          </head>
          <body>
            <div class="warning">⚠️ ВНИМАНИЕ! ⚠️</div>
            <h1>ВАШ КОМПЬЮТЕР ЗАРАЖЁН ТРОЯНОМ!</h1>
            <p>Если не хотите потерять все данные,<br>переведите нам 10000 рублей</p>
            <div class="warning">НЕМЕДЛЕННО!</div>
          </body>
        </html>
      `);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dollar Bill Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%2316A34A'/%3E%3Ctext x='200' y='100' text-anchor='middle' font-family='serif' font-size='60' fill='%23F5F5F5' opacity='0.3'%3E100%3C/text%3E%3Ctext x='200' y='130' text-anchor='middle' font-family='serif' font-size='20' fill='%23F5F5F5' opacity='0.3'%3EDOLLARS%3C/text%3E%3C/svg%3E")`,
          backgroundSize: "300px 150px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Money Counter */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="DollarSign" size={32} className="text-yellow-500" />
            <span className="text-4xl font-bold text-green-600 animate-pulse">
              {totalEarned.toLocaleString()} ₽
            </span>
          </div>
          <p className="text-green-700 font-medium">Заработано всего</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 max-w-md w-full border border-green-200">
          <h1 className="text-3xl font-bold text-center mb-2 text-green-800">
            💰 Генератор денег
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Получи деньги прямо сейчас!
          </p>

          {/* Progress Section */}
          {isGenerating && (
            <div className="mb-6 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Генерация...</span>
                <span>{timer}с</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          )}

          {/* 100 Rubles Button */}
          <Button
            onClick={handleGenerate100}
            disabled={isGenerating}
            className="w-full mb-6 h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <Icon name="Loader2" size={20} className="animate-spin" />
                Генерируем...
              </div>
            ) : (
              <>
                <Icon name="Banknote" size={20} className="mr-2" />
                Получить 100 рублей
              </>
            )}
          </Button>

          {/* Custom Amount Section */}
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Введите сумму"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="text-center text-lg h-12 border-green-300 focus:border-green-500"
              disabled={isGenerating}
            />

            <p className="text-center text-sm text-gray-600">
              Сгенерировать свою сумму
            </p>

            <Button
              onClick={handleGenerateCustom}
              disabled={isGenerating || !customAmount}
              variant="outline"
              className="w-full h-12 text-lg border-green-500 text-green-700 hover:bg-green-50 transform hover:scale-105 transition-all duration-200"
            >
              <Icon name="Zap" size={20} className="mr-2" />
              Сгенерировать
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-green-700">
          <p className="text-sm opacity-80">
            ⚡ Мгновенная генерация • 🔒 Безопасно • 💸 Бесплатно
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoneyGenerator;
