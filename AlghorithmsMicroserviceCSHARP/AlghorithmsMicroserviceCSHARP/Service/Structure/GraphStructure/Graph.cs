using System;
using System.Collections.Generic;
using System.Linq;

namespace AlghorithmsMicroserviceCSHARP.Service.Structure.GraphStructure;

public class Graph
{
    private List<int> _vertices;
    private Dictionary<int, List<Tuple<int, double>>> _connections;
    private Dictionary<int, Tuple<double, int>> _pair;


    public Graph()
    {
        _vertices = new List<int>();
        _connections = new Dictionary<int, List<Tuple<int, double>>>();
        _pair = new Dictionary<int, Tuple<double, int>>();
    }

    public void AddVertex(int vertex)
    {
        if (!_vertices.Contains(vertex))
        {
            _vertices.Add(vertex);
        }
    }

    public void AddUndirectedEdge(int vertex1, int vertex2, double weight)
    {
        if (!_connections.ContainsKey(vertex1))
        {
            _connections[vertex1] = new List<Tuple<int, double>>();
        }

        if (!_connections.ContainsKey(vertex2))
        {
            _connections[vertex2] = new List<Tuple<int, double>>();
        }

        _connections[vertex1].Add(new Tuple<int, double>(vertex2, weight));
        _connections[vertex2].Add(new Tuple<int, double>(vertex1, weight));
    }

    public void AddDirectedEdge(int startVertex, int endVertex, double weight)
    {
        if (!_connections.ContainsKey(startVertex))
        {
            _connections[startVertex] = new List<Tuple<int, double>>();
        }

        _connections[startVertex].Add(new Tuple<int, double>(endVertex, weight));
    }

    public void AddPair(int parentVertex, double weight, int startVertex)
    {
        _pair[parentVertex] = new Tuple<double, int>(weight, startVertex);
    }

    public List<Tuple<int, double>> GetConnectionsByKey(int key)
    {
        if (_connections.ContainsKey(key))
        {
            return _connections[key];
        }

        return null;
    }

    public void UpdateUndirectedConnectionWeight(int vertex1, int vertex2, double weight)
    {
        for (int i = 0; i < _connections[vertex1].Count(); i++)
        {
            if (_connections[vertex1][i].Item1 == vertex2)
            {
                _connections[vertex1][i] = new Tuple<int, double>(vertex2, weight);
                break;
            }
        }

        for (int i = 0; i < _connections[vertex2].Count(); i++)
        {

            if (_connections[vertex2][i] != null)
            {
                if (_connections[vertex2][i].Item1 == vertex1)
                {
                    _connections[vertex2][i] = new Tuple<int, double>(vertex1, weight);
                    break;
                }
            }
        }
    }

    public void UpdateDirectedConnectionWeight(int startVeretx, int endVertex, double weight)
    {
        for (int i = 0; i < _connections[startVeretx].Count(); i++)
        {
            if (_connections[startVeretx][i].Item1 == endVertex)
            {
                _connections[startVeretx][i] = new Tuple<int, double>(endVertex, weight);
                break;
            }
        }
    }

    public void Clear()
    {
        _vertices.Clear();
        _connections.Clear();
        _pair.Clear();
    }

    public List<int> GetVertices()
    {
        return _vertices;
    }

    public Dictionary<int, List<Tuple<int, double>>> GetConnections()
    {
        return _connections;
    }

    public Dictionary<int, Tuple<double, int>> GetPairs()
    {
        return _pair;
    }

}
