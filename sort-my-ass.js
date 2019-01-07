
/*
 * constructor AssSorter
 */
function AssSorter( ELM_SEL, BLOCK_SIZE ) {

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
	 * constructor Cell
	 */
	function Line( x, y ) {

		this.x       = x;
		this.y       = y;
		this.value   = 0;
		this.options = new Set( DIGITS );

	};
	Line.prototype.setValue = function( value ) {

		this.value   = value;
		this.options = new Set( [ value ] );

	};
	Line.prototype.update = function() {

		if ( !this.value && this.options.size === 1 )
			insert( this.x, this.y, this.options.values().next().value );

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

	function setBase() {

	}



	/*==*==*==*==*==*==*==*==*
	 *       Handlers        *
	 *==*==*==*==*==*==*==*==*/

	function BuildSudoku() {

		const $sudoku = $( '<sudoku>' )
			.delegate( 'cell.main', 'click',   handleCellClick   )
			.delegate( 'cell.main', 'keydown', handleCellKeydown )
			.delegate( 'cell.main', 'paste',   handleCellPaste   )
			.appendTo( $wrap );
		$sudoku[ 0 ].style.setProperty( '--block_size', BLOCK_SIZE );

		return $sudoku;

	}



	/*==*==*==*==*==*==*==*==*
	 *         Main          *
	 *==*==*==*==*==*==*==*==*/

	// constants
	const SIZE  = BLOCK_SIZE * BLOCK_SIZE;

	// DOM shit
	const $wrap = $( ELM_SEL );



	/** API **/
	return {
		//insert,
	};

}









