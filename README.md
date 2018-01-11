# ramon

> The lights in the fishing boats at anchor there [...]  
> Mastered the night and portioned out the sea,     
> Fixing emblazoned zones and fiery poles,  
> Arranging, deepening, enchanting night.

*Ramon Fernandez*, or *ramon* for short, is a visualization utility born from a specific, opinionated methodology for mapping "data" (a nebulous, all-encompassing term), to visual spaces.

### Data are tuples

"Data" is the plural of "datum," is a neuter singular *given*. A *datum* is an object together with a semantic context. *ramon* opines that a low-nonsense representation is that data are simply flat tuples (specifically, tuples not containing variable-length fields, as in BigQuery, or nested fields). Since nested fields are a convenience, they are easily dispensed with, but flattening arrays in data is a manipulation exercise of its own.

### Visualizations are functions from data to objects in 3D space

I mean 3D in the sense of Euclidean space. 3D objects themselves have their own additional dimensions (color, width, size, etc.). Moreover, for the purposes of visualization, it may not even be important that they are in 3D as opposed to 2D. Indeed, it is only via *trompe-l'oeil* that computers seem to show us 3D.

On the other hand, it would be odd to talk of visualizations in 4 spatial dimensions, since we'd only see (approximately) 3d slices of these at a time.

### Visualization is a hylomorphism
In the category sense, of course. An *anamorphism* (generation of WebGL attribute buffers from a single dataset) followed by a *catamorphism* (generation of an `Object3D` from the attribute buffers). The only reason to reason about visualization in this way is for the philosophical pun that follows:

### Objects in 3D space are hylomorphisms
In the Aristotelian sense, of course. They are composed of a `geometry` and `material` in three.js, and of a form (μορφή) and matter (ὕλη) in Aristotle's *Physics*.
