let clickCount = 0;
let sourceNode, targetNode;

$('.circle').each(function () {

    $(this).on('click', function () { 

        var vertId = $(this).attr('id').split('-')[1];
        var vert = $(this).attr('id');
        console.log("O vértice " + vert + " foi clicado");

        var cyNode = cy.getElementById(vertId);

        if (!sourceNode || sourceNode === vertId) {
            if (sourceNode === vertId) {
                cyNode.unselect();
                sourceNode = null;
            } else {
                sourceNode = vertId;
                cyNode.select();
            }
        } else {
            if (!targetNode) {
                targetNode = vertId;
                cyNode.select();
                
                findShortestPath(sourceNode, targetNode);
    
                cy.elements().unselect();
                sourceNode = null;
                targetNode = null;
            }
        }
    });
});

document.addEventListener('click', function(e) {
    console.log('X:', e.clientX, 'Y:', e.clientY);
});


let cy = cytoscape({
    headless: true,
    elements: [
        { data: { id: '1' } },
        { data: { id: '2' } },
        { data: { id: '3' } },
        { data: { id: '4' } },
        { data: { id: '5' } },
        { data: { id: '6' } },
        { data: { id: '7' } },
        { data: { id: '8' } },
        { data: { id: '9' } },
        { data: { id: '10' } },
        { data: { id: '11' } },
        { data: { id: '12' } },
        { data: { id: '13' } },
        { data: { id: '14' } },
        { data: { id: '15' } },
        { data: { id: '16' } },
        { data: { id: '17' } },
        { data: { id: '18' } },
        { data: { id: '19' } },
        { data: { id: '20' } },
        { data: { id: '21' } },
        { data: { id: '22' } },
        { data: { id: '23' } },
        { data: { id: '24' } },
        { data: { source: '1', target: '2', weight: 1 } },
        { data: { source: '2', target: '3', weight: 1 } },
        { data: { source: '2', target: '22', weight: 1 } },
        { data: { source: '3', target: '4', weight: 1 } },
        { data: { source: '3', target: '21', weight: 1 } },
        { data: { source: '3', target: '23', weight: 1 } },
        { data: { source: '3', target: '5', weight: 1 } },
        { data: { source: '21', target: '22', weight: 1 } },
        { data: { source: '21', target: '20', weight: 1 } },
        { data: { source: '21', target: '11', weight: 1 } },
        { data: { source: '23', target: '10', weight: 1 } },
        { data: { source: '10', target: '9', weight: 1 } },
        { data: { source: '9', target: '8', weight: 1 } },
        { data: { source: '8', target: '24', weight: 1 } },
        { data: { source: '8', target: '7', weight: 1 } },
        { data: { source: '7', target: '6', weight: 1 } },
        { data: { source: '7', target: '14', weight: 1 } },
        { data: { source: '14', target: '13', weight: 1 } },
        { data: { source: '13', target: '15', weight: 1 } },
        { data: { source: '15', target: '12', weight: 1 } },
        { data: { source: '12', target: '20', weight: 1 } },
        { data: { source: '20', target: '17', weight: 1 } },
        { data: { source: '17', target: '18', weight: 1 } },
        { data: { source: '18', target: '19', weight: 1 } },
        { data: { source: '17', target: '16', weight: 1 } }
        // ...
    ],
    style: [
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(id)'
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'label': 'data(weight)'
            }
        },
        {
            selector: '.highlighted',
            style: {
                'line-color': 'red',
                'width': 5,
                'z-index': 9999
            }
        }
    ],
    layout: {
        name: 'circle',
    }
});


function findShortestPath(sourceId, targetId) {
    cy.elements('.highlighted').removeClass('highlighted');
    console.log(`Finding path from ${sourceId} to ${targetId}`);
    var dijkstra = cy.elements().dijkstra({
        root: `#${sourceId}`,
        weight: function(edge) {
            return edge.data('weight');
        },
        directed: false
    });

    var path = dijkstra.pathTo(cy.getElementById(targetId));
    console.log(`Path: ${path.map(node => node.data('id')).join(' -> ')}`);
    
    path.addClass('highlighted');
    console.log(`Number of highlighted elements: ${cy.elements('.highlighted').length}`);
    return path;
}






