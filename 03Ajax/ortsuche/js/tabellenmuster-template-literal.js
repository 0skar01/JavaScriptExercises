let strTemplate = `<table class="ortsdetail">
	<tbody>
		<tr>
			<th colspan="2">
				<strong>${}</strong>, 
				Bezirk: ${}, 
				Kreis: ${  || '—'} 
			</th>  
		</tr>
		<tr>
			<th colspan="2">
			${} ${} ${}
			</th>
		</tr>
		<tr>
			<td>
				${}<br/>  
				${} ${}<br/>  
				<a href="//${}">
				${}</a>  
			</td>
			<td>
				Telefon: ${}<br/>  
				Fax: ${}<br/>  
				E-Mail: <a href="mailto:${}">
				${}</a>  
			</td>
		</tr> 
	</tbody>
</table>`;