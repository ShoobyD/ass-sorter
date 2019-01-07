
/*
 * constructor AssSorter
 */
function AssSorter( ELM_SEL ) {

	try {
		$( ELM_SEL );
	} catch( err ) {
		console.error( 'Bad element selector.' );
		return;
	}



	/*==*==*==*==*==*==*==*==*
	 *      Components       *
	 *==*==*==*==*==*==*==*==*/

	/*
	 * constructor Line
	 */
	function Line( str ) {

		const match  = str.match( /Dialogue: ([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),(.*)/ );
		if ( !match ) return;
		this.Layer   = match[  1 ];
		this.Start   = match[  2 ];
		this.End     = match[  3 ];
		this.Style   = match[  4 ];
		this.Name    = match[  5 ];
		this.MarginL = match[  6 ];
		this.MarginR = match[  7 ];
		this.MarginV = match[  8 ];
		this.Effect  = match[  9 ];
		this.Text    = match[ 10 ];

	};
	Line.prototype.render = function() {

		return $( `
				<tr title="${ this.Start }">
					<td class="name">${ this.Name }</td>
					<td class="text">${ this.parseText() }&rlm;</td>
				</tr>
			` )
			.addClass( 'line' );

	};
	Line.prototype.parseText = function() {

		return this.Text
			.split( '\\N' )
			.join( '<br>' );

	};



	/*==*==*==*==*==*==*==*==*
	 *      AssSorter fn     *
	 *==*==*==*==*==*==*==*==*/

	function setDroploader() {

		return $( '<div>' )
			.appendTo( $wrap )
			.droploader( {
				'onload' : function( fileList ) {
					if ( !fileList.length ) {
						dialog.open( 'Choose at least one file.' );
						return;
					}
					if ( fileList.length > 1 ) {
						dialog.open( [
							`<h2>One file at a time, Bruh..</h2>`,
							`<h3>${ fileList.length } files uploaded:</h3>`,
							`<ul>${ Array.from( fileList ).map( f => `<li>${ f.name }</li>` ).join( '' ) }</ul>`,
						] );
						return;
					}
					if ( !/\.ass$/i.test( fileList[ 0 ].name ) ) {
						dialog.open( 'Only ASS files are supported.' );
						return;
					}
					handleFile( fileList[ 0 ] );
				},
			} );

	}

	function handleFile( file ) {
		const reader = new FileReader();
		reader.readAsText( file )
		reader.onload = function() {
			$uploader.hide();
			parseResult( reader.result );
		}
	}

	function parseResult( txt ) {

		testIsHebrew( txt );
		let lines = txt.split( '\n' ).filter( l => /^Dialogue:/i.test( l ) );
		lines = lines.map( l => new Line( l ) );
		lines.sort( ( a, b ) => new Date( '1970/01/01 ' + a.Start ) - new Date('1970/01/01 ' + b.Start ) );

		$output
			.html( renderLines( lines ) )
			.show();
	}

	function testIsHebrew( txt ) {

		if ( /[א-ת]/i.test( txt ) )
			$output.addClass( 'hebrew-ass' );

	}

	function renderLines( lines ) {

		return $( '<table>' ).html( lines.map( l => l.render() ) );

	}

	function reset() {

		$output.empty().hide();
		$uploader.show();

	}



	/*==*==*==*==*==*==*==*==*
	 *         Main          *
	 *==*==*==*==*==*==*==*==*/

	// constants
	const dialog = window.Dialog? new Dialog(): { 'open' : alert.bind( window ) };

	// DOM shit
	const $wrap     = $( ELM_SEL );
	const $uploader = setDroploader();
	const $output   = $( '<div id="output">' ).appendTo( $wrap );
	$( '<button>' )
		.html( 'Reset' )
		.addClass( 'reset' )
		.click( reset )
		.prependTo( $wrap );


	/** API **/
	return {
		reset,
	};

}









