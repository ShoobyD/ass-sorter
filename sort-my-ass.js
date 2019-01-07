
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

	// Inheritance function
	function inherits( ctor, superCtor ) {
		ctor.super_    = superCtor;
		ctor.prototype = Object.create( superCtor.prototype, {
			'constructor' : {
				'value'        : ctor,
				'enumerable'   : false,
				'writable'     : true,
				'configurable' : true,
			}
		} );
	};



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



	/*==*==*==*==*==*==*==*==*
	 *      General fn       *
	 *==*==*==*==*==*==*==*==*/

	function isDigit( x ) {

		return /^[0-9]$/.test( x );

	}



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
				},
			} );

	}



	/*==*==*==*==*==*==*==*==*
	 *       Handlers        *
	 *==*==*==*==*==*==*==*==*/

	function BuildSudoku() {

	}



	/*==*==*==*==*==*==*==*==*
	 *         Main          *
	 *==*==*==*==*==*==*==*==*/

	// constants
	const dialog = window.Dialog? new Dialog(): { 'open' : alert.bind( window ) };

	// DOM shit
	const $wrap = $( ELM_SEL );
	const uploader = setDroploader();



	/** API **/
	return {
		//insert,
	};

}









