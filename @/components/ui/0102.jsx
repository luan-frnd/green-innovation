"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AlertCircle, CheckCircle2, Zap } from 'lucide-react'

export default function HomePage() {
  const [kwhValue, setKwhValue] = useState('')
  const [weeklyData, setWeeklyData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [yearlyData, setYearlyData] = useState([])
  const [tarifa, setTarifa] = useState('')
  const [valorDesejado, setValorDesejado] = useState('')
  const [consumoNecessario, setConsumoNecessario] = useState(0)
  const [consumoFaltante, setConsumoFaltante] = useState(0)

  useEffect(() => {
    if (kwhValue) {
      const baseValue = parseFloat(kwhValue)
      
      // Gerar dados semanais
      setWeeklyData(
        Array.from({ length: 7 }, (_, i) => ({
          day: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][i],
          consumo: baseValue + (Math.random() - 0.5) * baseValue * 0.2
        }))
      )

      // Gerar dados mensais
      setMonthlyData(
        Array.from({ length: 30 }, (_, i) => ({
          dia: i + 1,
          consumo: baseValue * 4 + (Math.random() - 0.5) * baseValue * 0.5
        }))
      )

      // Gerar dados anuais
      setYearlyData(
        Array.from({ length: 12 }, (_, i) => ({
          mes: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
          consumo: baseValue * 30 + (Math.random() - 0.5) * baseValue * 10
        }))
      )
    }
  }, [kwhValue])

  const handleTarifaSubmit = (e) => {
    e.preventDefault()
    // A tarifa já está sendo atualizada em tempo real, então não precisamos fazer nada aqui
  }

  const calcularCustoEstimado = (consumo) => {
    const tarifaValue = parseFloat(tarifa)
    return isNaN(tarifaValue) ? '0.00' : (consumo * tarifaValue).toFixed(2)
  }

  const handleValorDesejadoSubmit = (e) => {
    e.preventDefault()
    const valorDesejadoNum = parseFloat(valorDesejado)
    const tarifaValue = parseFloat(tarifa)
    if (!isNaN(valorDesejadoNum) && !isNaN(tarifaValue) && tarifaValue > 0) {
      const consumoNecessarioCalc = valorDesejadoNum / tarifaValue
      setConsumoNecessario(consumoNecessarioCalc.toFixed(2))
      
      const consumoMensal = monthlyData.reduce((sum, day) => sum + day.consumo, 0)
      const consumoFaltanteCalc = consumoNecessarioCalc - consumoMensal
      setConsumoFaltante(consumoFaltanteCalc > 0 ? consumoFaltanteCalc.toFixed(2) : '0.00')
    }
  }

  const consumoSemanal = weeklyData.reduce((sum, day) => sum + day.consumo, 0)
  const consumoMensal = monthlyData.reduce((sum, day) => sum + day.consumo, 0)
  const consumoAnual = yearlyData.reduce((sum, month) => sum + month.consumo, 0)
  const consumoProximoMes = consumoMensal * 1.1 // Estimativa de 10% a mais

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Monitoramento de Energia</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Simulação de Dados do ESP32</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="kwhValue">Valor base de kWh (simulando ESP32)</Label>
            <Input
              id="kwhValue"
              placeholder="Ex: 10"
              value={kwhValue}
              onChange={(e) => setKwhValue(e.target.value)}
              type="number"
              step="0.01"
              min="0"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="week" className="space-y-4">
        <TabsList>
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="month">Mês</TabsTrigger>
          <TabsTrigger value="year">Ano</TabsTrigger>
        </TabsList>

        <TabsContent value="week">
          <Card>
            <CardHeader>
              <CardTitle>Consumo Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="consumo" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month">
          <Card>
            <CardHeader>
              <CardTitle>Consumo Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="consumo" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="year">
          <Card>
            <CardHeader>
              <CardTitle>Consumo Anual</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="consumo" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Resumo do Consumo e Custos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Semana</h3>
              <p className="text-2xl font-bold">{consumoSemanal.toFixed(2)} kWh</p>
              <p className="text-md">R$ {calcularCustoEstimado(consumoSemanal)}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Mês</h3>
              <p className="text-2xl font-bold">{consumoMensal.toFixed(2)} kWh</p>
              <p className="text-md">R$ {calcularCustoEstimado(consumoMensal)}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Ano</h3>
              <p className="text-2xl font-bold">{consumoAnual.toFixed(2)} kWh</p>
              <p className="text-md">R$ {calcularCustoEstimado(consumoAnual)}</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold">Estimativa para o Próximo Mês</h3>
            <p className="text-2xl font-bold">{consumoProximoMes.toFixed(2)} kWh</p>
            <p className="text-md">R$ {calcularCustoEstimado(consumoProximoMes)}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Cadastro de Tarifa</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTarifaSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tarifa">Valor da Tarifa (R$/kWh)</Label>
              <Input
                id="tarifa"
                placeholder="Ex: 0.75"
                value={tarifa}
                onChange={(e) => setTarifa(e.target.value)}
                type="number"
                step="0.01"
                min="0"
                required
              />
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Simulação de Consumo Desejado</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleValorDesejadoSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="valorDesejado">Valor Desejado (R$)</Label>
              <Input
                id="valorDesejado"
                placeholder="Ex: 100.00"
                value={valorDesejado}
                onChange={(e) => setValorDesejado(e.target.value)}
                type="number"
                step="0.01"
                min="0"
                required
              />
            </div>
            <Button type="submit">Calcular</Button>
          </form>
          {consumoNecessario > 0 && (
            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Métrica</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Consumo Necessário</TableCell>
                    <TableCell>{consumoNecessario} kWh</TableCell>
                    <TableCell className="text-right">
                      <Zap className="inline-block w-5 h-5 text-yellow-500" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Consumo Atual</TableCell>
                    <TableCell>{consumoMensal.toFixed(2)} kWh</TableCell>
                    <TableCell className="text-right">
                      <CheckCircle2 className="inline-block w-5 h-5 text-green-500" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Falta Consumir</TableCell>
                    <TableCell>{consumoFaltante} kWh</TableCell>
                    <TableCell className="text-right">
                      {parseFloat(consumoFaltante) <= 0 ? (
                        <AlertCircle className="inline-block w-5 h-5 text-red-500" />
                      ) : (
                        <CheckCircle2 className="inline-block w-5 h-5 text-green-500" />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {parseFloat(consumoFaltante) <= 0 && (
                <p className="mt-4 text-red-500 font-semibold">
                  Atenção: Você já ultrapassou o consumo para o valor desejado!
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}