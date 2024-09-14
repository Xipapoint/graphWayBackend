using System;
using System.Collections.Generic;
using AlghorithmsMicroserviceCSHARP.Service.Structure.GraphStructure;
// using AlghorithmsMicroserviceCSHARP.Service.Alghorithm.Interfaces;
namespace AlghorithmsMicroserviceCSHARP.Service.Alghorithm.Handlers;

public class GraphAlghorithmHandler
{
    private Dictionary<string, IGraphAlghorithm> _algorithms = null!;

    public void GraphAlgorithmHandler()
    {
        _algorithms = new Dictionary<string, IGraphAlghorithm>
        {
            { "dijkstra", new DijkstraAlgorithm() }
        };
    }

    public void Handle(string algorithmName, Graph graph)
    {
        if (_algorithms.ContainsKey(algorithmName.ToLower()))
        {
            _algorithms[algorithmName.ToLower()].Execute(graph);
        }
        else
        {
            throw new ArgumentException($"Алгоритм '{algorithmName}' не найден.");
        }
    }
}