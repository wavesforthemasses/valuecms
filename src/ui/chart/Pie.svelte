<script>
  import { pie, arc } from 'd3-shape'
  import { scaleOrdinal } from 'd3-scale'
  import { entries } from 'd3-collection'
  export let data
  let active = null
  const width = 450, height = 450, margin = 40
  const radius = Math.min(width, height) / 2 - margin
  const myPie = pie().value(d => d.value)
  $: data_ready = myPie(entries(data))
  $: color = scaleOrdinal().domain(Object.keys(data)).range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"])
</script>

<style>
	svg{
		width: 200px;
		height: 200px;
	}
  path{
    stroke: #fff;
    stroke-width: 3;
    opacity: 0.75;
    cursor: pointer;
  }
  path.active{
    opacity: 1;
  }
</style>

<svg height={width} width={height} viewBox={`0 0 ${width} ${height}`}>
  <g transform={`translate(${width / 2}, ${height / 2})`}>
    {#each data_ready as d (d.data.key)}
      <path d={(arc().innerRadius(0).outerRadius(radius).startAngle(d.startAngle).endAngle(d.endAngle))()}
            fill={color(d.data.key)}
            on:click={() => active = active == d.data.key ? null : d.data.key}
            class:active={active == d.data.key}/>
    {/each}
  </g>
</svg>
