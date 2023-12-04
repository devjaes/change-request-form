import Link from 'next/link'
import React from 'react'

export default function HomepageLogin({ id, name }: { id: string, name?: string | undefined }) {
    return (
        <div>
            <h1>Bienvenido de vuelta {name}</h1>
            <Link href={`/dashboard/${id}`}>Join Dashboard</Link>

        </div>
    )
}
