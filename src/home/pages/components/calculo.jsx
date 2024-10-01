"use client"

import React, { useState } from 'react'
import { useTable, Column } from 'react-table'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Zap } from 'lucide-react'


type TableData = {
  periodo: string
  consumo: string
  custo: string
}

type SimulationData = {
  metrica: string
  valor: string
  status: JSX.Element
}

export default function EnergySummary() {
  const [kwhValue, setKwhValue] = useState('10')
  const [tarifa, setTarifa] = useState('0.5')
  const [valorDesejado, setValorDesejado] = useState('')
  const [consumoNecessario, setConsumoNecessario] = useState(0)
  const [consumoFaltante, setConsumoFaltante] = useState(0)

  const consumoSemanal = parseFloat(kwhValue) * 7
  const consumoMensal = parseFloat(kwhValue) * 30
  const consumoAnual = parseFloat(kwhValue) * 365
  const consumoProximoMes = consumoMensal * 1.1

  const calcularCustoEstimado = (consumo: number): string => {
    const tarifaValue = parseFloat(tarifa)
    return isNaN(tarifaValue) ? '0.00' : (consumo * tarifaValue).toFixed(2)
  }

  const handleValorDesejadoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const valorDesejadoNum = parseFloat(valorDesejado)
    const tarifaValue = parseFloat(tarifa)
    if (!isNaN(valorDesejadoNum) && !isNaN(tarifaValue) && tarifaValue > 0) {
      const consumoNecessarioCalc = valorDesejadoNum / tarifaValue
      setConsumoNecessario(consumoNecessarioCalc)
      
      const consumoFaltanteCalc = consumoNecessarioCalc - consumoMensal
      setConsumoFaltante(consumoFaltanteCalc > 0 ? consumoFaltanteCalc : 0)
    }
  }

  const resumoData: TableData[] = [
    { periodo: 'Semana', consumo: consumoSemanal.toFixed(2), custo: calcularCustoEstimado(consumoSemanal) },
    { periodo: 'Mês', consumo: consumoMensal.toFixed(2), custo: calcularCustoEstimado(consumoMensal) },
    { periodo: 'Ano', consumo: consumoAnual.toFixed(2), custo: calcularCustoEstimado(consumoAnual) },
    { periodo: 'Próximo Mês (Estimativa)', consumo: consumoProximoMes.toFixed(2), custo: calcularCustoEstimado(consumoProximoMes) },
  ]

  const resumoColumns: Column<TableData>[] = [
    { Header: 'Período', accessor: 'periodo' },
    { Header: 'Consumo (kWh)', accessor: 'consumo' },
    { Header: 'Custo (R$)', accessor: 'custo' },
  ]

  const simulacaoData: SimulationData[] = [
    { metrica: 'Consumo Necessário', valor: `${consumoNecessario.toFixed(2)} kWh`, status: <Zap className="inline-block w-5 h-5 text-yellow-500" /> },
    { metrica: 'Consumo Atual', valor: `${consumoMensal.toFixed(2)} kWh`, status: <CheckCircle2 className="inline-block w-5 h-5 text-green-500" /> },
    { metrica: 'Falta Consumir', valor: `${consumoFaltante.toFixed(2)} kWh`, status: consumoFaltante <= 0 ? <AlertCircle className="inline-block w-5 h-5 text-red-500" /> : <CheckCircle2 className="inline-block w-5 h-5 text-green-500" /> },
  ]

  const simulacaoColumns: Column<SimulationData>[] = [
    { Header: 'Métrica', accessor: 'metrica' },
    { Header: 'Valor', accessor: 'valor' },
    { Header: 'Status', accessor: 'status' },
  ]

  const Table = <T extends object>({ columns, data }: { columns: Column<T>[], data: T[] }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data })

    return (
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="text-left p-2" key={column.id}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="p-2" key={cell.column.id}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Consumo e Custos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table columns={resumoColumns} data={resumoData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cadastro de Tarifa</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card>
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
              <Table columns={simulacaoColumns} data={simulacaoData} />
              {consumoFaltante <= 0 && (
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