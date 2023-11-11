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

document.addEventListener('click', function (e) {
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
        { data: { source: '1', target: '2', weight: 3.5 } },
        { data: { source: '2', target: '3', weight: 2.3 } },
        { data: { source: '2', target: '22', weight: 3.5 } },
        { data: { source: '3', target: '4', weight: 5 } },
        { data: { source: '3', target: '21', weight: 1.5 } },
        { data: { source: '3', target: '23', weight: 2.3 } },
        { data: { source: '3', target: '5', weight: 4 } },
        { data: { source: '21', target: '23', weight: 2.3 } },
        { data: { source: '21', target: '20', weight: 3 } },
        { data: { source: '21', target: '11', weight: 1.2 } },
        { data: { source: '21', target: '12', weight: 1.2 } },
        { data: { source: '23', target: '10', weight: 1.2 } },
        { data: { source: '23', target: '9', weight: 1.2 } },
        { data: { source: '23', target: '24', weight: 2.3 } },
        { data: { source: '24', target: '8', weight: 1.2 } },
        { data: { source: '24', target: '7', weight: 1.2 } },
        { data: { source: '24', target: '5', weight: 3 } },
        { data: { source: '10', target: '9', weight: 1 } },
        { data: { source: '9', target: '8', weight: 1 } },
        { data: { source: '9', target: '14', weight: 1.2 } },
        { data: { source: '8', target: '7', weight: 1 } },
        { data: { source: '8', target: '14', weight: 1.2 } },
        { data: { source: '7', target: '6', weight: 2.3 } },
        { data: { source: '7', target: '14', weight: 1.5 } },
        { data: { source: '14', target: '13', weight: 2.3 } },
        { data: { source: '13', target: '15', weight: 1 } },
        { data: { source: '15', target: '12', weight: 1.2 } },
        { data: { source: '12', target: '20', weight: 1.2 } },
        { data: { source: '12', target: '13', weight: 1.2 } },
        { data: { source: '17', target: '18', weight: 1 } },
        { data: { source: '18', target: '19', weight: 1.2 } },
        { data: { source: '17', target: '16', weight: 1.2 } },
        { data: { source: '20', target: '22', weight: 1.2 } },
        { data: { source: '11', target: '10', weight: 1 } },
        { data: { source: '11', target: '12', weight: 1 } },
        { data: { source: '11', target: '13', weight: 1 } },
        { data: { source: '13', target: '10', weight: 1.2 } },
        { data: { source: '15', target: '16', weight: 2 } },
        { data: { source: '5', target: '6', weight: 3 } },
        { data: { source: '22', target: '17', weight: 1.2 } },
        { data: { source: '22', target: '16', weight: 2 } }
    ],
    layout: {
        name: 'circle',
    }
});


function findShortestPath(sourceId, targetId) {

    resetPathStyles();

    console.log(`Finding path from ${sourceId} to ${targetId}`);
    var dijkstra = cy.elements().dijkstra({
        root: `#${sourceId}`,
        weight: function (edge) {
            return edge.data('weight');
        },
        directed: false
    });

    var path = dijkstra.pathTo(cy.getElementById(targetId));
    console.log(`Path: ${path.map(node => node.data('id')).join(' -> ')}`);



    highlightPath(path);
    return path;
}

function resetPathStyles() {
    $('.edges svg path').removeClass('highlighted');
}

function highlightPath(path) {

    document.querySelectorAll('.edges svg path').forEach(function (pathElement) {
        pathElement.style.strokeOpacity = "0";
        pathElement.removeAttribute('style');
        pathElement.classList.remove('contour', 'highlighted');
    });

    path.edges().forEach(edge => {
        var source = edge.data('source');
        var target = edge.data('target');

        var edgeId = `e-${source}-${target}`;
        var reverseEdgeId = `e-${target}-${source}`;

        var svgEdge = document.getElementById(edgeId) || document.getElementById(reverseEdgeId);
        console.log('id svg', svgEdge)
        var svgElement = document.querySelector(`#${edgeId}`) || document.querySelector(`#${reverseEdgeId}`);

        if (svgElement) {
            var contourPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            contourPath.setAttribute('d', svgElement.querySelector('path').getAttribute('d'));
            contourPath.setAttribute('class', 'contour');
            svgElement.prepend(contourPath);

            var highlightedPath = svgElement.querySelector('path:not(.contour)');
            setTimeout(() => {
                highlightedPath.classList.add('highlighted');
                highlightedPath.style.strokeOpacity = "1";
            }, 10);
        }

    });
}






