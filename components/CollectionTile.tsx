import Link from "next/link";
import type { Collection } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { resolveImage } from "@/lib/images";
import { Arrow } from "./Icon";
import { Media } from "./Media";

/** Photo above, text panel below: built on the Home Decor card from the brand brief. */
export function CollectionTile({ collection, lang }: { collection: Collection; lang: Locale }) {
  return (
    <Link href={`/${lang}/collections/${collection.slug}`} className="tile">
      <Media
        src={resolveImage(collection.image)}
        alt={collection.imageAlt[lang]}
        label={collection.imageLabel}
        sizes="(max-width: 600px) 82vw, (max-width: 1100px) 50vw, 320px"
      />
      <div className="tile__text">
        <h3>{collection.name[lang]}</h3>
        <p>{collection.description[lang]}</p>
        <Arrow />
      </div>
    </Link>
  );
}
