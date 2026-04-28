import "solid-js";

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * The <selectedcontent> element displays a clone of the currently
             * selected <option>'s content inside a customizable <select>.
             */
            selectedcontent: object;
        }
    }
}
